export const EDULandRental = [
    {
        inputs: [
            { internalType: "address", name: "landAddress", type: "address" },
            { internalType: "address", name: "pointsAddress", type: "address" },
            {
                internalType: "address",
                name: "landPriceHelperAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "maintenanceFee_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maintenanceFeeDenominator_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minRentalDuration_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maxRentalDuration_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maxRentalCountPerCall_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maxTokenSupply_",
                type: "uint256",
            },
            {
                internalType: "contract IForwarderRegistry",
                name: "forwarderRegistry",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            { internalType: "uint256", name: "calculatedFee", type: "uint256" },
            { internalType: "uint256", name: "maxFee", type: "uint256" },
        ],
        name: "FeeExceeded",
        type: "error",
    },
    { inputs: [], name: "IllegalInterfaceId", type: "error" },
    { inputs: [], name: "InconsistentArrayLengths", type: "error" },
    { inputs: [], name: "InvalidLandAddress", type: "error" },
    { inputs: [], name: "InvalidPointsAddress", type: "error" },
    { inputs: [], name: "InvalidTokenIdsParam", type: "error" },
    { inputs: [], name: "NoTokenCollected", type: "error" },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "NotContractOwner",
        type: "error",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "NotRoleHolder",
        type: "error",
    },
    { inputs: [], name: "RentalCountPerCallLimitExceeded", type: "error" },
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        name: "RentalDurationTooHigh",
        type: "error",
    },
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        name: "RentalDurationTooLow",
        type: "error",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "TokenAlreadyRented",
        type: "error",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "TokenNotExpired",
        type: "error",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "TokenNotRented",
        type: "error",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "UnsupportedTokenId",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "Collected",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newLandPriceHelper",
                type: "address",
            },
        ],
        name: "LandPriceHelperUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newMaintenanceFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newMaintenanceFeeDenominator",
                type: "uint256",
            },
        ],
        name: "MaintenanceFeeUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newMaxRentalCountPerCall",
                type: "uint256",
            },
        ],
        name: "MaxRentalCountPerCallUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newMaxRentalDuration",
                type: "uint256",
            },
        ],
        name: "MaxRentalDurationUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newMaxTokenSupply",
                type: "uint256",
            },
        ],
        name: "MaxTokenSupplyUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newMinRentalDuration",
                type: "uint256",
            },
        ],
        name: "MinRentalDurationUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "renter",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "beginDates",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "endDates",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "fees",
                type: "uint256[]",
            },
        ],
        name: "Rental",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "EDU_LAND",
        outputs: [
            { internalType: "contract IEDULand", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "OPERATOR_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "POINTS",
        outputs: [
            { internalType: "contract Points", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "RENTAL_CONSUME_CODE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
        ],
        name: "calculateElapsedTimeForExpiredTokens",
        outputs: [
            { internalType: "uint256", name: "elapsedTime", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
        ],
        name: "collectExpiredTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "totalOngoingRentalTime_",
                type: "uint256",
            },
        ],
        name: "estimateLandPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
            { internalType: "uint256[]", name: "durations", type: "uint256[]" },
            {
                internalType: "uint256[]",
                name: "expiredTokenIds",
                type: "uint256[]",
            },
        ],
        name: "estimateRentalFee",
        outputs: [{ internalType: "uint256", name: "fee", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "forwarderRegistry",
        outputs: [
            {
                internalType: "contract IForwarderRegistry",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "hasRole_", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "forwarder", type: "address" },
        ],
        name: "isTrustedForwarder",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "landPriceHelper",
        outputs: [
            {
                internalType: "contract IEDULandPriceHelper",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maintenanceFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maintenanceFeeDenominator",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxRentalCountPerCall",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxRentalDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxTokenSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minRentalDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address[]", name: "accounts", type: "address[]" },
            {
                internalType: "contract IERC20[]",
                name: "tokens",
                type: "address[]",
            },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        name: "recoverERC20s",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address[]", name: "accounts", type: "address[]" },
            {
                internalType: "contract IERC721[]",
                name: "contracts",
                type: "address[]",
            },
            { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
        ],
        name: "recoverERC721s",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable[]",
                name: "accounts",
                type: "address[]",
            },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        name: "recoverETH",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
            { internalType: "uint256[]", name: "durations", type: "uint256[]" },
            {
                internalType: "uint256[]",
                name: "expiredTokenIds",
                type: "uint256[]",
            },
            { internalType: "uint256", name: "maxFee", type: "uint256" },
        ],
        name: "rent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "rentals",
        outputs: [
            { internalType: "uint256", name: "beginDate", type: "uint256" },
            { internalType: "uint256", name: "endDate", type: "uint256" },
            { internalType: "uint256", name: "fee", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newLandPriceHelper",
                type: "address",
            },
        ],
        name: "setLandPriceHelper",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newMaintenanceFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "newMaintenanceFeeDenominator",
                type: "uint256",
            },
        ],
        name: "setMaintenanceFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newRentalCountPerCall",
                type: "uint256",
            },
        ],
        name: "setMaxRentalCountPerCall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newMaxRentalDuration",
                type: "uint256",
            },
        ],
        name: "setMaxRentalDuration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newMaxTokenSupply",
                type: "uint256",
            },
        ],
        name: "setMaxTokenSupply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newMinRentalDuration",
                type: "uint256",
            },
        ],
        name: "setMinRentalDuration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalOngoingRentalTime",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
