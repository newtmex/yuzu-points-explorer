import { onchainTable } from "ponder";
import { zeroAddress } from "viem";

export const pointClaim = onchainTable("point_claim", (t) => ({
    address: t.hex().primaryKey(),
    balance: t.bigint().notNull(),
}));

export const eduLandNFTs = onchainTable("edu_land_nfts", (t) => ({
    tokenId: t.bigint().primaryKey(),
    beginDate: t.bigint().notNull().default(0n),
    endDate: t.bigint().notNull().default(0n),
    fee: t.bigint().notNull().default(0n),
    renter: t.hex().notNull().default(zeroAddress),
    timestamp: t.bigint().notNull().default(0n),
}));

export const broadcastLog = onchainTable("broadcast_log", (t) => ({
    timestamp: t.bigint().primaryKey(),
}));
