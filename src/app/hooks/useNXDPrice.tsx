import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { UNISWAP_V2_PAIR_ABI } from '@/abis/uniswapv2pair';
import { UNISWAP_V3_PAIR_ABI } from '@/abis/uniswapv3pair';
import {
  DXN_WETH_UNI_LP_ADDRESS,
  ETH_USDC_UNI_LP_ADDRESS,
  NXD_DECIMALS,
  NXD_DXN_UNI_LP_ADDRESS,
  NXD_ERC20_ADDRESS,
} from '@/consts';
import { divideByDecimals } from '@/utils';
import React from 'react';
import { useReadContract } from 'wagmi';

const useNXDPrice = () => {
  const { data: uniswapV2Pair, isLoading: isLoadingUniswapV2Pair } =
    useReadContract({
      abi: NXD_ERC20_ABI,
      functionName: 'uniswapV2Pair',
      address: NXD_ERC20_ADDRESS,
    });

  const { data: uniswapV2PairReserves } = useReadContract({
    abi: UNISWAP_V2_PAIR_ABI,
    functionName: 'getReserves',
    address: uniswapV2Pair,
  });
  const { data: token0, isLoading: isLoadingToken0 } = useReadContract({
    abi: UNISWAP_V2_PAIR_ABI,
    functionName: 'token0',
    address: NXD_DXN_UNI_LP_ADDRESS,
  });

  const nxdIsToken0 = token0 === NXD_ERC20_ADDRESS;

  const uiReserve0 = uniswapV2PairReserves?.[0]
    ? divideByDecimals(uniswapV2PairReserves?.[0].toString(), NXD_DECIMALS)
    : 0;
  const uiReserve1 = uniswapV2PairReserves?.[1]
    ? divideByDecimals(uniswapV2PairReserves?.[1].toString(), NXD_DECIMALS)
    : 0;

  const nxdReserves = nxdIsToken0 ? uiReserve0 : uiReserve1;
  const dxnReserves = nxdIsToken0 ? uiReserve1 : uiReserve0;

  const nxdPriceInDXN = Number(dxnReserves) / Number(nxdReserves);

  const { data: dxnWETHSlot0 } = useReadContract({
    abi: UNISWAP_V3_PAIR_ABI,
    functionName: 'slot0',
    address: DXN_WETH_UNI_LP_ADDRESS,
  });

  const tick = dxnWETHSlot0?.[1]?.toString() || '0';

  const dxnPriceInWeth = 1.0001 ** parseInt(tick);

  const { data: usdcWethSlot0 } = useReadContract({
    abi: UNISWAP_V3_PAIR_ABI,
    functionName: 'slot0',
    address: ETH_USDC_UNI_LP_ADDRESS,
  });

  const ethUSDCSqrt = usdcWethSlot0?.[0]?.toString() || '0';

  const ethPriceInUSD = 1e12 / (Number(ethUSDCSqrt) / 2 ** 96) ** 2;

  const dxnPriceInUSD = dxnPriceInWeth * ethPriceInUSD;

  const nxdPriceInUSD = nxdPriceInDXN * dxnPriceInUSD;

  return {
    nxdPriceInDXN,
    dxnPriceInWeth,
    dxnPriceInUSD,
    nxdPriceInUSD,
    ethPriceInUSD,
  };
};

export default useNXDPrice;
