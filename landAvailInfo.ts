import { ApiContext, Context } from "ponder:registry";
import { createPublicClient, http } from "viem";
import { eduLandNFTs } from "ponder:schema";
import { asc, gt, max, replaceBigInts } from "ponder";

const publicClient = createPublicClient({
    transport: http(
        process.env.PONDER_RPC_URL_41923 || "http://127.0.0.1:8545"
    ),
});

export default async function (db: ApiContext["db"] | Context["db"]["sql"]) {
    const [{ timestamp }, rentedTokenIds] = await Promise.all([
        publicClient.getBlock(),
        db
            .select({ tokenId: eduLandNFTs.tokenId })
            .from(eduLandNFTs)
            .orderBy(asc(eduLandNFTs.tokenId))
            .execute()
            .then((rows) => rows.map((row) => row.tokenId)),
    ]);

    const expiredTokenIds = await db
        .select({ tokenId: eduLandNFTs.tokenId })
        .from(eduLandNFTs)
        .orderBy(asc(eduLandNFTs.endDate))
        .where(gt(eduLandNFTs.endDate, timestamp))
        .execute()
        .then((rows) => rows.map((row) => row.tokenId));

    let availableTokenIds = [] as typeof rentedTokenIds;

    const unAvailableTokenIds = rentedTokenIds.filter(
        (id) => !expiredTokenIds.includes(id)
    );

    for (let i = 1; i <= 10000; i++) {
        const tokenId = BigInt(i);
        if (
            !rentedTokenIds.includes(tokenId) &&
            !expiredTokenIds.includes(tokenId)
        ) {
            availableTokenIds = [...availableTokenIds, tokenId];
        }
    }

    return {
        availableTokenIds: availableTokenIds.map((id) =>
            replaceBigInts(id, String)
        ),
        unAvailableTokenIds: unAvailableTokenIds.map((id) =>
            replaceBigInts(id, String)
        ),
        expiredTokenIds: expiredTokenIds.map((id) =>
            replaceBigInts(id, String)
        ),
        timestamp: replaceBigInts(timestamp, Number),
        lastTimestamp: replaceBigInts(
            (
                await db
                    .select({ lastTimestamp: max(eduLandNFTs.timestamp) })
                    .from(eduLandNFTs)
                    .limit(1)
                    .execute()
            ).at(0)?.lastTimestamp ?? 0,
            Number
        ),
    };
}
