import { ApiContext, Context } from "ponder:registry";
import { createPublicClient, getContract, http } from "viem";
import { contracts } from "./ponder.config";
import { broadcastLog, eduLandNFTs, pointClaim } from "ponder:schema";
import { asc, desc, gt, gte, replaceBigInts, sum } from "ponder";

const publicClient = createPublicClient({
    transport: http(
        process.env.PONDER_RPC_URL_41923 || "http://127.0.0.1:8545"
    ),
});

const EDULandRental = getContract({
    abi: contracts.EDULandRental.abi,
    address: contracts.EDULandRental.address,
    client: publicClient,
});

export default async function (
    db: ApiContext["db"] | Context["db"]["sql"],
    broadcast: boolean = false
) {
    const [{ timestamp }, rentedTokenIds] = await Promise.all([
        publicClient.getBlock(),
        db
            .select({ tokenId: eduLandNFTs.tokenId })
            .from(eduLandNFTs)
            .execute()
            .then((rows) => rows.map((row) => row.tokenId)),
    ]);

    const expiredTokenIds = await db
        .select({ tokenId: eduLandNFTs.tokenId })
        .from(eduLandNFTs)
        .orderBy(asc(eduLandNFTs.endDate))
        .limit(20)
        .where(gt(eduLandNFTs.endDate, timestamp))
        .execute()
        .then((rows) => rows.map((row) => row.tokenId));

    let tokenIds = [...expiredTokenIds];

    if (tokenIds.length < 20) {
        const unAvailableTokenIds = rentedTokenIds.filter(
            (id) => !expiredTokenIds.includes(id)
        );

        for (let i = 1; i <= 10000 && tokenIds.length < 20; i++) {
            const tokenId = BigInt(i);
            if (unAvailableTokenIds.includes(tokenId)) {
                tokenIds = [...tokenIds, tokenId];
            }
        }
    }

    const totalRented = await db.$count(eduLandNFTs);

    const [_30days, _60days] = await Promise.all(
        [30n, 60n].map(async (days) => {
            const fee =
                tokenIds.length < 1n
                    ? 3000n
                    : (await EDULandRental.read.estimateRentalFee([
                          tokenIds,
                          new Array(tokenIds.length).fill(
                              days * 24n * 60n * 60n
                          ),
                          expiredTokenIds,
                      ])) / BigInt(tokenIds.length);

            const qualifyingRecords = await db
                .select()
                .from(pointClaim)
                .where(gte(pointClaim.balance, fee))
                .orderBy(desc(pointClaim.balance))
                .execute()
                .then((results) =>
                    results.map((result) => ({
                        eduLandRentable: Number(result.balance / fee),
                        ...result,
                    }))
                );

            const totalRentable = qualifyingRecords.reduce(
                (acc, cur) => acc + cur.eduLandRentable,
                0
            );

            return replaceBigInts(
                {
                    fee,
                    totalRentable,
                    landRentalDeficitDelta:
                        10_000 - totalRentable - totalRented,
                    qualifyingRecords,
                },
                String
            );
        })
    );

    const info = {
        _30days,
        _60days,
        totalRented,
        yuzuSupply: (
            await db
                .select({ supply: sum(pointClaim.balance) })
                .from(pointClaim)
                .execute()
        ).at(0)?.supply,
    };

    if (broadcast) {
        const lastBroadcast = await db
            .select()
            .from(broadcastLog)
            .orderBy(desc(broadcastLog.timestamp))
            .limit(1)
            .execute()
            .then((rows) => rows[0]?.timestamp);

        if (!lastBroadcast || timestamp - lastBroadcast >= 300) {
            // Your broadcast logic here
            console.log("Broadcasting info:", JSON.stringify(info, null, 2));
            // Update the timestamp in the database
            await db.insert(broadcastLog).values({ timestamp }).execute();
        }
    }

    return info;
}
