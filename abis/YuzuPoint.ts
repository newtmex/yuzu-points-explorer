export const YuzuPoint = [
    {
        type: "constructor",
        inputs: [
            {
                name: "forwarderRegistry_",
                type: "address",
                internalType: "contract IForwarderRegistry",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "ADMIN_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "DEPOSITOR_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "SPENDER_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "addConsumeReasonCodes",
        inputs: [
            {
                name: "reasonCodes",
                type: "bytes32[]",
                internalType: "bytes32[]",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "allowedConsumeReasonCodes",
        inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "balances",
        inputs: [
            {
                name: "holder",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "balance",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "consume",
        inputs: [
            {
                name: "holder",
                type: "address",
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "consumeReasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "consume",
        inputs: [
            {
                name: "holder",
                type: "address",
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "consumeReasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "signature",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "consume",
        inputs: [
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "consumeReasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "deposit",
        inputs: [
            {
                name: "holder",
                type: "address",
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "depositReasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "eip712Domain",
        inputs: [],
        outputs: [
            {
                name: "fields",
                type: "bytes1",
                internalType: "bytes1",
            },
            { name: "name", type: "string", internalType: "string" },
            {
                name: "version",
                type: "string",
                internalType: "string",
            },
            {
                name: "chainId",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "verifyingContract",
                type: "address",
                internalType: "address",
            },
            {
                name: "salt",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "extensions",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "forwarderRegistry",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract IForwarderRegistry",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "grantRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "hasRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [{ name: "hasRole_", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "isTrustedForwarder",
        inputs: [
            {
                name: "forwarder",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "nonces",
        inputs: [
            {
                name: "hashHolderSpender",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [
            {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "removeConsumeReasonCodes",
        inputs: [
            {
                name: "reasonCodes",
                type: "bytes32[]",
                internalType: "bytes32[]",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "renounceRole",
        inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "revokeRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
                internalType: "bytes4",
            },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transferOwnership",
        inputs: [
            {
                name: "newOwner",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "ConsumeReasonCodesAdded",
        inputs: [
            {
                name: "reasonCodes",
                type: "bytes32[]",
                indexed: true,
                internalType: "bytes32[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ConsumeReasonCodesRemoved",
        inputs: [
            {
                name: "reasonCodes",
                type: "bytes32[]",
                indexed: true,
                internalType: "bytes32[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Consumed",
        inputs: [
            {
                name: "operator",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "reasonCode",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "holder",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Deposited",
        inputs: [
            {
                name: "sender",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "reasonCode",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "holder",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "EIP712DomainChanged",
        inputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
            {
                name: "previousOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "newOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "RoleGranted",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                indexed: false,
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                indexed: false,
                internalType: "address",
            },
            {
                name: "operator",
                type: "address",
                indexed: false,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "RoleRevoked",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                indexed: false,
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                indexed: false,
                internalType: "address",
            },
            {
                name: "operator",
                type: "address",
                indexed: false,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "ConsumeReasonCodeAlreadyExists",
        inputs: [
            {
                name: "reasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
    },
    {
        type: "error",
        name: "ConsumeReasonCodeDoesNotExist",
        inputs: [
            {
                name: "reasonCode",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
    },
    {
        type: "error",
        name: "ConsumeReasonCodesArrayEmpty",
        inputs: [],
    },
    { type: "error", name: "DepositZeroAmount", inputs: [] },
    { type: "error", name: "ExpiredSignature", inputs: [] },
    { type: "error", name: "IllegalInterfaceId", inputs: [] },
    {
        type: "error",
        name: "InsufficientBalance",
        inputs: [
            {
                name: "holder",
                type: "address",
                internalType: "address",
            },
            {
                name: "requiredBalance",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    { type: "error", name: "InvalidForwarderRegistry", inputs: [] },
    { type: "error", name: "InvalidShortString", inputs: [] },
    { type: "error", name: "InvalidSignature", inputs: [] },
    {
        type: "error",
        name: "NotContractOwner",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "NotRoleHolder",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "StringTooLong",
        inputs: [{ name: "str", type: "string", internalType: "string" }],
    },
] as const;
