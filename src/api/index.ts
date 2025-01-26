import { ponder } from "ponder:registry";
import { asc, graphql, gt, replaceBigInts } from "ponder";
import { eduLandNFTs } from "ponder:schema";

import { createPublicClient, http } from "viem";
import yuzuSummary from "../../yuzuSummary";

const publicClient = createPublicClient({
    transport: http(
        process.env.PONDER_RPC_URL_41923 || "http://127.0.0.1:8545"
    ),
});

ponder.use("/graphql", graphql());
ponder.use("/", graphql());

ponder.get("land-avail-info", async (c) => {
    const [{ timestamp }, rentedTokenIds] = await Promise.all([
        publicClient.getBlock(),
        c.db
            .select({ tokenId: eduLandNFTs.tokenId })
            .from(eduLandNFTs)
            .orderBy(asc(eduLandNFTs.tokenId))
            .execute()
            .then((rows) => rows.map((row) => row.tokenId)),
    ]);

    const expiredTokenIds = await c.db
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

    console.log(
        availableTokenIds[0],
        rentedTokenIds.length + availableTokenIds.length,
        unAvailableTokenIds.length + expiredTokenIds.length,
        rentedTokenIds.length
    );

    return c.json(
        replaceBigInts(
            { availableTokenIds, unAvailableTokenIds, expiredTokenIds },
            String
        )
    );
});

ponder.get("/point-stats", async (c) => {
    return c.json(await yuzuSummary(c.db));
});
