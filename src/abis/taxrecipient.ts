export const TAX_RECIPIENT_ABI = [
  {
    'type': 'constructor',
    'inputs': [
      { 'name': '_protocol', 'type': 'address', 'internalType': 'address' },
    ],
    'stateMutability': 'nonpayable',
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
    'name': 'dxn',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract IERC20' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'dxnAddedToLp',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'dxnStaked',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'handleTax',
    'inputs': [],
    'outputs': [],
    'stateMutability': 'nonpayable',
  },
  {
    'type': 'function',
    'name': 'nxd',
    'inputs': [],
    'outputs': [
      { 'name': '', 'type': 'address', 'internalType': 'contract IERC20' },
    ],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'nxdAddedToLp',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'uint256', 'internalType': 'uint256' }],
    'stateMutability': 'view',
  },
  {
    'type': 'function',
    'name': 'protocol',
    'inputs': [],
    'outputs': [{ 'name': '', 'type': 'address', 'internalType': 'address' }],
    'stateMutability': 'view',
  },
  { 'type': 'error', 'name': 'OnlyNXD', 'inputs': [] },
] as const;
