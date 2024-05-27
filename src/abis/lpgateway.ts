export const LP_GATEWAY_ABI = [
  {
    'type': 'function',
    'name': 'UNISWAP_V2_FACTORY',
    'inputs': [],
    'outputs': [
      {
        'name': '',
        'type': 'address',
        'internalType': 'contract IUniswapV2Factory',
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
    'name': 'addLiquidity',
    'inputs': [
      { 'name': 'tokenB', 'type': 'address', 'internalType': 'address' },
      {
        'name': 'amountNXDDesired',
        'type': 'uint256',
        'internalType': 'uint256',
      },
      {
        'name': 'amountBDesired',
        'type': 'uint256',
        'internalType': 'uint256',
      },
      { 'name': 'amountNXDMin', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'amountBMin', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'to', 'type': 'address', 'internalType': 'address' },
      { 'name': 'deadline', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [
      { 'name': 'amountA', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'amountB', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'liquidity', 'type': 'uint256', 'internalType': 'uint256' },
    ],
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
    'name': 'removeLiquidity',
    'inputs': [
      { 'name': 'tokenB', 'type': 'address', 'internalType': 'address' },
      { 'name': 'liquidity', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'amountNXDMin', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'amountBMin', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'to', 'type': 'address', 'internalType': 'address' },
      { 'name': 'deadline', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'outputs': [
      { 'name': 'amountNXD', 'type': 'uint256', 'internalType': 'uint256' },
      { 'name': 'amountDXN', 'type': 'uint256', 'internalType': 'uint256' },
    ],
    'stateMutability': 'nonpayable',
  },
];
