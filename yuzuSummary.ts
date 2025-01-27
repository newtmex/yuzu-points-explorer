import { ApiContext, Context } from "ponder:registry";
import { createPublicClient, getContract, http, zeroAddress } from "viem";
import { contracts } from "./ponder.config";
import { broadcastLog, eduLandNFTs, pointClaim } from "ponder:schema";
import { asc, desc, gt, gte, replaceBigInts, sum } from "ponder";
import { bot } from "./bot";
import landAvailInfo from "./landAvailInfo";

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
    const {
        timestamp: _ts,
        availableTokenIds,
        lastTimestamp,
    } = await landAvailInfo(db);

    const timestamp = BigInt(_ts);
    let tokenIds: bigint[] = (
        await Promise.allSettled(
            availableTokenIds.slice(0, 50).map(async (id) => {
                const owner = await EduLand.read.ownerOf([BigInt(id)]);

                return BigInt(zeroAddress == owner ? id : 0);
            })
        )
    )
        .filter((r) => r.status == "fulfilled")
        .filter(({ value }) => value > 0n)
        .map((r) => r.value)
        .slice(0, 20);

    const totalRented = (await db.$count(eduLandNFTs)) || 0;

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
                          [],
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

            return {
                ...replaceBigInts(
                    {
                        fee,
                        totalRentable,
                        landRentalDeficitDelta:
                            10_000 - totalRentable - totalRented,
                    },
                    Number
                ),
                qualifyingRecords: qualifyingRecords.map((r) =>
                    replaceBigInts(r, Number)
                ),
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

    if (broadcast && _ts - lastTimestamp <= 3600) {
        const lastBroadcast = await db
            .select()
            .from(broadcastLog)
            .orderBy(desc(broadcastLog.timestamp))
            .limit(1)
            .execute()
            .then((rows) => rows[0]?.timestamp);

        if (!lastBroadcast || timestamp - lastBroadcast >= 45) {
            const gainzUrl = "https://www\\.gainzswap\\.xyz";

            const escapeMarkdownV2 = (text: string) =>
                text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");

            const formatQualifier = (data: any) =>
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
                    data?.landRentalDeficitDelta?.toLocaleString() ||
                        "No Deficit"
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
    }

    return info;
}
