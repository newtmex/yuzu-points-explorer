import { ponder } from "ponder:registry";
import { eduLandNFTs, pointClaim } from "ponder:schema";
import yuzuSummary from "../yuzuSummary";
import { bot } from "../bot";

ponder.on(
    "OCPointMerkleClaim:PayoutClaimed",
    async ({
        event,
        context: {
            db,
            contracts: { YuzuPoint },
            client,
        },
    }) => {
        const { recipient } = event.args;
        const balance = await client.readContract({
            abi: YuzuPoint.abi,
            address: YuzuPoint.address,
            functionName: "balances",
            args: [recipient]
        });

        await db
            .insert(pointClaim)
            .values({
                address: recipient,
                balance,
            })
            .onConflictDoUpdate(() => ({
                balance,
            }));

        await yuzuSummary(db.sql, true);
    }
);

ponder.on("EDULandRental:Rental", async ({ event, context: { db } }) => {
    const { renter, ...log } = event.args;

    const entries = log.tokenIds.map((tokenId, index) => ({
        tokenId,
        renter,
        fee: log.fees[index]!,
        beginDate: log.beginDates[index]!,
        endDate: log.endDates[index]!,
        timestamp: event.block.timestamp,
    }));

    const entriesByTokenId = Object.fromEntries(
        entries.map(({ tokenId, ...values }) => [tokenId.toString(), values])
    );

    await db
        .insert(eduLandNFTs)
        .values(entries)
        .onConflictDoUpdate(
            ({ tokenId }) => entriesByTokenId[tokenId.toString()]!
        );

    await yuzuSummary(db.sql, true);
});

ponder.on(
    "YuzuPoint:Consumed",
    async ({
        event,
        context: {
            db,
            contracts: { YuzuPoint },
            client,
        },
    }) => {
        const recipient = event.args.holder;

        const balance = await client.readContract({
            abi: YuzuPoint.abi,
            address: YuzuPoint.address,
            functionName: "balances",
            args: [recipient],
        });

        await db
            .insert(pointClaim)
            .values({
                address: recipient,
                balance,
            })
            .onConflictDoUpdate(() => ({
                balance,
            }));

        await yuzuSummary(db.sql, true);
    }
);

bot.on("message", async (ctx) => {
    console.log(ctx.chatId);
});
