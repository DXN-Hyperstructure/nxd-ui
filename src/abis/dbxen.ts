export const DBXEN_ABI = [
  {
    'type': 'constructor',
    'inputs': [
      { 'name': 'forwarder', 'type': 'address', 'internalType': 'address' },
      { 'name': 'xenAddress', 'type': 'address', 'internalType': 'address' },
    ],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'MAX_BPS',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'SCALING_FACTOR',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'XEN_BATCH_AMOUNT',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accAccruedFees',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accCycleBatchesBurned',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accFirstStake',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accRewards',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accSecondStake',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accStakeCycle',
    'inputs': [
      { 'name': '', 'type': 'address', 'internalType': 'address' },
      { 'name': '', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'accWithdrawableStake',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'burnBatch',
    'inputs': [
      { 'name': 'batchNumber', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'payable',
  },
  {
    'type': 'function',
    'name': 'claimFees',
    'inputs': [],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'claimRewards',
    'inputs': [],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'currentCycle',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'currentCycleReward',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'currentStartedCycle',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'cycleAccruedFees',
    'inputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'cycleFeesPerStakeSummed',
    'inputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'cycleTotalBatchesBurned',
    'inputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'dxn',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract DBXenERC20' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'getCurrentCycle',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'i_initialTimestamp',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'i_periodDuration',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'isTrustedForwarder',
    'inputs': [
      { 'name': 'forwarder', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastActiveCycle',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastCycleReward',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastFeeUpdateCycle',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastStartedCycle',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'onTokenBurned',
    'inputs': [
      { 'name': 'user', 'type': 'address', 'internalType': 'address' },
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'pendingFees',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'pendingStake',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'pendingStakeWithdrawal',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'previousStartedCycle',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'rewardPerCycle',
    'inputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'stake',
    'inputs': [
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'summedCycleStakes',
    'inputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'supportsInterface',
    'inputs': [
      { 'name': 'interfaceId', 'type': 'bytes4', 'internalType': 'bytes4' },
    ],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'pure',
  },
  {
    'type': 'function',
    'name': 'totalNumberOfBatchesBurned',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'trustedForwarder',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'unstake',
    'inputs': [
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'xen',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract MockToken' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'event',
    'name': 'Burn',
    'inputs': [
      {
        'name': 'userAddress',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'batchNumber',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'FeesClaimed',
    'inputs': [
      {
        'name': 'cycle',
        'type': 'uint256',
        'indexed': true,
        'internalType': 'uint256',
      },
      {
        'name': 'account',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'fees',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'NewCycleStarted',
    'inputs': [
      {
        'name': 'cycle',
        'type': 'uint256',
        'indexed': true,
        'internalType': 'uint256',
      },
      {
        'name': 'calculatedCycleReward',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
      {
        'name': 'summedCycleStakes',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'Redeemed',
    'inputs': [
      {
        'name': 'user',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'xenContract',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'tokenContract',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'xenAmount',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
      {
        'name': 'tokenAmount',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'RewardsClaimed',
    'inputs': [
      {
        'name': 'cycle',
        'type': 'uint256',
        'indexed': true,
        'internalType': 'uint256',
      },
      {
        'name': 'account',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'reward',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'Staked',
    'inputs': [
      {
        'name': 'cycle',
        'type': 'uint256',
        'indexed': true,
        'internalType': 'uint256',
      },
      {
        'name': 'account',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'amount',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'Unstaked',
    'inputs': [
      {
        'name': 'cycle',
        'type': 'uint256',
        'indexed': true,
        'internalType': 'uint256',
      },
      {
        'name': 'account',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'amount',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'error',
    'name': 'AddressEmptyCode',
    'inputs': [
      { 'name': 'target', 'type': 'address', 'internalType': 'address' },
    ],
  },
  {
    'type': 'error',
    'name': 'AddressInsufficientBalance',
    'inputs': [
      { 'name': 'account', 'type': 'address', 'internalType': 'address' },
    ],
  },
  { 'type': 'error', 'name': 'FailedInnerCall', 'inputs': [] },
  { 'type': 'error', 'name': 'ReentrancyGuardReentrantCall', 'inputs': [] },
  {
    'type': 'error',
    'name': 'SafeERC20FailedOperation',
    'inputs': [
      { 'name': 'token', 'type': 'address', 'internalType': 'address' },
    ],
  },
] as const;
