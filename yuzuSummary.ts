import { ApiContext, Context } from "ponder:registry";
import { createPublicClient, getContract, http } from "viem";
import { contracts } from "./ponder.config";
import { broadcastLog, eduLandNFTs, pointClaim } from "ponder:schema";
import {
    desc,
    eq,
    gt,
    gte,
    max,
    ne,
    or,
    replaceBigInts,
    sum,
    count,
    lt,
    avg,
} from "ponder";
import { bot } from "./bot";

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

const EduLand = getContract({
    abi: contracts.EduLand.abi,
    address: contracts.EduLand.address,
    client: publicClient,
});

export default async function (
    db: ApiContext["db"] | Context["db"]["sql"],
    broadcast: boolean = false
) {
    // Check if the table is empty and populate it
    if ((await db.$count(eduLandNFTs)) == 0) {
        await Promise.all(
            new Array(10000).fill(0).map((_, index) =>
                db
                    .insert(eduLandNFTs)
                    .values({
                        tokenId: BigInt(index + 1),
                    })
                    .onConflictDoNothing()
                    .execute()
            )
        );
    }

    let shouldBroadcast = false;
    let timestamp = BigInt(Number.MAX_SAFE_INTEGER);

    if (broadcast) {
        const lastTimestamp =
            (
                await db
                    .select({ lastTimestamp: max(eduLandNFTs.timestamp) })
                    .from(eduLandNFTs)
                    .limit(1)
                    .execute()
            ).at(0)?.lastTimestamp ?? 0n;

        timestamp = (await publicClient.getBlock()).timestamp;

        if (timestamp - lastTimestamp >= 3600) return null;

        const lastBroadcast = await db
            .select()
            .from(broadcastLog)
            .orderBy(desc(broadcastLog.timestamp))
            .limit(1)
            .execute()
            .then((rows) => rows[0]?.timestamp);

        shouldBroadcast = !lastBroadcast || timestamp - lastBroadcast >= 45;
    }

    if (broadcast && !shouldBroadcast) return null;

    const [tokenIds, expiredTokenIds] = await db
        .select()
        .from(eduLandNFTs)
        .where(
            or(gt(eduLandNFTs.endDate, timestamp), eq(eduLandNFTs.endDate, 0n))
        )
        .limit(20)
        .execute()
        .then((rows) =>
            rows.reduce(
                (acc, row) => {
                    if (row.endDate == 0n) {
                        acc[0].push(row.tokenId);
                    } else {
                        acc[1].push(row.tokenId);
                    }

                    return acc;
                },
                [[], []] as [bigint[], bigint[]]
            )
        );

    const totalRented = BigInt(
        (
            await db
                .select({ total: count(eduLandNFTs.tokenId) })
                .from(eduLandNFTs)
                .where(
                    or(
                        lt(eduLandNFTs.endDate, timestamp),
                        ne(eduLandNFTs.endDate, 0n)
                    )
                )
                .execute()
        ).at(0)?.total || 0
    );

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

            const [totalRentable, qualifyingRecords] = await Promise.all([
                db
                    .select({
                        averageBal: avg(pointClaim.balance),
                    })
                    .from(pointClaim)
                    .where(gte(pointClaim.balance, fee))
                    .execute()
                    .then(
                        (results) =>
                            BigInt(
                                Number(results.at(0)?.averageBal ?? 0).toFixed(
                                    0
                                )
                            ) / fee
                    ),
                db
                    .select()
                    .from(pointClaim)
                    .where(gte(pointClaim.balance, fee))
                    .orderBy(desc(pointClaim.balance))
                    .limit(1)
                    .execute()
                    .then((rs) =>
                        rs
                            .map((r) => ({
                                eduLandRentable: r.balance / fee,
                                ...r,
                            }))
                            .map((r) => replaceBigInts(r, Number))
                    ),
            ]);

            return {
                ...replaceBigInts(
                    {
                        fee,
                        totalRentable,
                        landRentalDeficitDelta:
                            10_000n - totalRentable - totalRented,
                    },
                    Number
                ),
                qualifyingRecords,
            };
        })
    );

    const info = {
        _30days,
        _60days,
        totalRented,
        yuzuSupply: Number(
            (
                await db
                    .select({ supply: sum(pointClaim.balance) })
                    .from(pointClaim)
                    .execute()
            ).at(0)?.supply ?? 0
        ),
    };

    if (shouldBroadcast) {
        const gainzUrl = "https://www\\.gainzswap\\.xyz";

        const escapeMarkdownV2 = (text: string | undefined) =>
            text?.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");

        const formatQualifier = (data: typeof info._30days) =>
            data?.qualifyingRecords.length
                ? `👥 *Top Qualifier:*  
🔹 *Address:* \`${escapeMarkdownV2(data.qualifyingRecords.at(0)?.address)}\`  
🔹 *Rentable Land:* ${escapeMarkdownV2(
                      data.qualifyingRecords
                          .at(0)
                          ?.eduLandRentable.toLocaleString()
                  )}  
🔹 *Yuzu Balance:* ${escapeMarkdownV2(
                      data.qualifyingRecords.at(0)?.balance.toLocaleString()
                  )}`
                : "👥 *Top Qualifier:* _No Data Available_";

        const formatReport = (label: string, data: any) =>
            `📅 *${escapeMarkdownV2(label)}*  
💰 *Rental Fee:* ${escapeMarkdownV2(data?.fee.toLocaleString())} YUZU  
🏠 *Total Rentable Land:* ${escapeMarkdownV2(
                data?.totalRentable.toLocaleString()
            )}  
📊 *Rental Deficit Change:* ${escapeMarkdownV2(
                data?.landRentalDeficitDelta?.toLocaleString() || "No Deficit"
            )}  
${formatQualifier(data)}`;

        const message = `🚀 *EduLand Rental Update\\!* 🌍🏡  
            
${formatReport("30 Days Estimation", _30days)}  

${formatReport("60 Days Estimation", _60days)}  

🔢 *Total Rented Land:* ${escapeMarkdownV2(
            info.totalRented?.toLocaleString() || "Data Not Available"
        )}  
💎 *YUZU Supply:* ${escapeMarkdownV2(info.yuzuSupply.toLocaleString())}  

📢 *Stay tuned for more updates\\!*  

🚜✨ Maximise your yield by participating in [GainzSwap ILO](${gainzUrl}) at [${gainzUrl}](${gainzUrl})`;

        await bot.api.sendMessage(process.env.CHANNEL_ID!, message, {
            parse_mode: "MarkdownV2",
        });

        // Update the timestamp in the database
        await db.insert(broadcastLog).values({ timestamp }).execute();
    }

    return info;
}
