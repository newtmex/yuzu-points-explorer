import { createConfig } from "ponder";
import { getAddress, http } from "viem";

import { OCPointMerkleClaim } from "./abis/OCPointMerkleClaim";
import { EDULandRental } from "./abis/EDULandRental";
import { YuzuPoint } from "./abis/YuzuPoint";
import { EduLand } from "./abis/EduLand";

const getAddressStartBlock = (
    values: {
        address: `0x${string}`;
        startBlock: number;
    },
    index: number
) => {
    if (!process.env.PONDER_RPC_URL_41923) {
        const LocalDeploy = require("../solidity/broadcast/Deploy.s.sol/31337/run-latest.json");

        const transaction = LocalDeploy.transactions.at(index);
        const receipt = LocalDeploy.receipts.at(index);
        if (!transaction || !receipt) {
            throw Error("No value at index: " + index);
        }

        values.address = getAddress(transaction.contractAddress);
        values.startBlock = +receipt.blockNumber;
    }

    return values;
};

export const contracts = {
    YuzuPoint: {
        network: "educhain",
        abi: YuzuPoint,
        ...getAddressStartBlock(
            {
                address: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
                startBlock: 8527,
            },
            1
        ),
    },
    OCPointMerkleClaim: {
        network: "educhain",
        abi: OCPointMerkleClaim,
        ...getAddressStartBlock(
            {
                address: "0xA090B0eCb026b48BF7E607066c9Ab189B320FDD0",
                startBlock: 8529,
            },
            2
        ),
    },
    EduLand: {
        network: "educhain",
        abi: EduLand,
        ...getAddressStartBlock(
            {
                address: "0xCD68f66269613AC6aa01BB1C2A7302AB84D9098A",
                startBlock: 647823,
            },
            4
        ),
    },
    EDULandRental: {
        network: "educhain",
        abi: EDULandRental,
        ...getAddressStartBlock(
            {
                address: "0x825956e27f1967da1659245De541895e530cA352",
                startBlock: 647827,
            },
            6
        ),
    },
} as const;

export default createConfig({
    networks: {
        educhain: {
            chainId: process.env.PONDER_RPC_URL_41923 ? 41923 : 31337,
            disableCache: !process.env.PONDER_RPC_URL_41923,
            transport: http(
                process.env.PONDER_RPC_URL_41923 || "http://127.0.0.1:8545"
            ),
        },
    },
    contracts,
});
