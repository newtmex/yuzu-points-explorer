import { onchainTable } from "ponder";

export const pointClaim = onchainTable("point_claim", (t) => ({
    address: t.hex().primaryKey(),
    balance: t.bigint().notNull(),
}));

export const eduLandNFTs = onchainTable("edu_land_nfts", (t) => ({
    tokenId: t.bigint().primaryKey(),
    beginDate: t.bigint().notNull(),
    endDate: t.bigint().notNull(),
    fee: t.bigint().notNull(),
    renter: t.hex().notNull(),
}));

export const broadcastLog = onchainTable("broadcast_log", (t) => ({
    timestamp: t.bigint().primaryKey(),
}));
