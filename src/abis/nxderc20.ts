export const NXD_ERC20_ABI = [
  {
    'type': 'constructor',
    'inputs': [
      {
        'name': '_initialSupply',
        'type': 'uint256',
        'internalType': 'uint256',
      },
      {
        'name': '_initialSupplyTo',
        'type': 'address',
        'internalType': 'address',
      },
      { 'name': '_dxn', 'type': 'address', 'internalType': 'contract IERC20' },
      { 'name': '_governance', 'type': 'address', 'internalType': 'address' },
      { 'name': '_vesting', 'type': 'address', 'internalType': 'address' },
      { 'name': '_devFeeTo', 'type': 'address', 'internalType': 'address' },
    ],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'DEADBEEF',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'MAX_DEV_ALLOC',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'MAX_REWARDS_SUPPLY',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'SELL_TAX_X100',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'UNISWAP_V2_FACTORY',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract IUniV2Factory',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'UNISWAP_V2_ROUTER',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract IUniswapV2Router02',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'UNISWAP_V3_FACTORY',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract IUniswapV3Factory',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'allowance',
    'inputs': [
      { 'name': 'owner', 'type': 'address', 'internalType': 'address' },
      { 'name': 'spender', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'approve',
    'inputs': [
      { 'name': 'spender', 'type': 'address', 'internalType': 'address' },
      { 'name': 'value', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'balanceOf',
    'inputs': [
      { 'name': 'account', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'decimals',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint8', 'internalType': 'uint8' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'devFeeTo',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'dxn',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract IERC20' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'getAmountsAfterTax',
    'inputs': [
      { 'name': 'from', 'type': 'address', 'internalType': 'address' },
      { 'name': 'to', 'type': 'address', 'internalType': 'address' },
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [
      { 'name': '', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': '', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'governance',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'isExcludedFromTax',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [
      {
        'name': 'isExcludedWhenSender',
        'type': 'bool',
        'internalType': 'bool',
      },
      {
        'name': 'isExcludedWhenRecipient',
        'type': 'bool',
        'internalType': 'bool',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastSupplyOfDXNInPair',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lastSupplyOfNXDInPair',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'lpSupplyOfPair',
    'inputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'maxSupply',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'mint',
    'inputs': [
      { 'name': 'account', 'type': 'address', 'internalType': 'address' },
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'mintDevAlloc',
    'inputs': [
      { 'name': 'account', 'type': 'address', 'internalType': 'address' },
      { 'name': 'amount', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'name',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'string', 'internalType': 'string' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'protocol',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'setDevFeeTo',
    'inputs': [
      { 'name': '_devFeeTo', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'setGovernance',
    'inputs': [
      { 'name': '_governance', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'setUniswapV2Pair',
    'inputs': [
      {
        'name': '_uniswapV2Pair',
        'type': 'address',
        'internalType': 'address',
      },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'setV2Oracle',
    'inputs': [
      { 'name': '_v2Oracle', 'type': 'address', 'internalType': 'address' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'symbol',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'string', 'internalType': 'string' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'taxRecipient',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract TaxRecipient',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'totalNXDBurned',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'totalSupply',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'transfer',
    'inputs': [
      { 'name': 'to', 'type': 'address', 'internalType': 'address' },
      { 'name': 'value', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'transferFrom',
    'inputs': [
      { 'name': 'from', 'type': 'address', 'internalType': 'address' },
      { 'name': 'to', 'type': 'address', 'internalType': 'address' },
      { 'name': 'value', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [{ 'name': '', 'type': 'bool', 'internalType': 'bool' }],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'uniswapV2Pair',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract IUniswapV2Pair',
      },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'updateTaxWhitelist',
    'inputs': [
      { 'name': 'account', 'type': 'address', 'internalType': 'address' },
      { 'name': 'whenSender', 'type': 'bool', 'internalType': 'bool' },
      { 'name': 'whenRecipient', 'type': 'bool', 'internalType': 'bool' },
    ],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'v2Oracle',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract IV2Oracle' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'event',
    'name': 'Approval',
    'inputs': [
      {
        'name': 'owner',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'spender',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'value',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'event',
    'name': 'Transfer',
    'inputs': [
      {
        'name': 'from',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'to',
        'type': 'address',
        'indexed': true,
        'internalType': 'address',
      },
      {
        'name': 'value',
        'type': 'uint256',
        'indexed': false,
        'internalType': 'uint256',
      },
    ],
    'anonymous': false,
  },
  {
    'type': 'error',
    'name': 'ERC20InsufficientAllowance',
    'inputs': [
      { 'name': 'spender', 'type': 'address', 'internalType': 'address' },
      { 'name': 'allowance', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'needed', 'type': 'uint256', 'internalType': 'uint256' },
    ],
  },
  {
    'type': 'error',
    'name': 'ERC20InsufficientBalance',
    'inputs': [
      { 'name': 'sender', 'type': 'address', 'internalType': 'address' },
      { 'name': 'balance', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'needed', 'type': 'uint256', 'internalType': 'uint256' },
    ],
  },
  {
    'type': 'error',
    'name': 'ERC20InvalidApprover',
    'inputs': [
      { 'name': 'approver', 'type': 'address', 'internalType': 'address' },
    ],
  },
  {
    'type': 'error',
    'name': 'ERC20InvalidReceiver',
    'inputs': [
      { 'name': 'receiver', 'type': 'address', 'internalType': 'address' },
    ],
  },
  {
    'type': 'error',
    'name': 'ERC20InvalidSender',
    'inputs': [
      { 'name': 'sender', 'type': 'address', 'internalType': 'address' },
    ],
  },
  {
    'type': 'error',
    'name': 'ERC20InvalidSpender',
    'inputs': [
      { 'name': 'spender', 'type': 'address', 'internalType': 'address' },
    ],
  },
  { 'type': 'error', 'name': 'MaxSupply', 'inputs': [] },
  { 'type': 'error', 'name': 'NoLPWithdraw', 'inputs': [] },
  { 'type': 'error', 'name': 'NoRemovalMainLP', 'inputs': [] },
  { 'type': 'error', 'name': 'NoRemovalZeroAddress', 'inputs': [] },
  { 'type': 'error', 'name': 'Unauthorized', 'inputs': [] },
] as const;
