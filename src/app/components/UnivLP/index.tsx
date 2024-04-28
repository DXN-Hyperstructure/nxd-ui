'use client';
import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { TAX_RECIPIENT_ABI } from '@/abis/taxrecipient';
import { UNISWAP_V2_PAIR_ABI } from '@/abis/uniswapv2pair';
import useNXDPrice from '@/app/hooks/useNXDPrice';
import {
  DXN_DECIMALS,
  DXN_ERC20_ADDRESS,
  NXD_DECIMALS,
  NXD_ERC20_ADDRESS,
  TAX_RECIPIENT_ADDRESS,
} from '@/consts';
import { divideByDecimals, formattedNum } from '@/utils';
import Link from 'next/link';
import React from 'react';
import { useReadContract } from 'wagmi';

const Univ = () => {
  const { data: uniswapV2Pair, isLoading: isLoadingUniswapV2Pair } =
    useReadContract({
      abi: NXD_ERC20_ABI,
      functionName: 'uniswapV2Pair',
      address: NXD_ERC20_ADDRESS,
    });

  const { data: token0, isLoading: isLoadingToken0 } = useReadContract({
    abi: UNISWAP_V2_PAIR_ABI,
    functionName: 'token0',
    address: uniswapV2Pair,
  });

  const { dxnPriceInUSD, nxdPriceInUSD } = useNXDPrice();
  const nxdIsToken0 = token0 === NXD_ERC20_ADDRESS;

  const {
    data: uniswapV2PairReserves,
    isLoading: isLoadingUniswapV2PairReserves,
  } = useReadContract({
    abi: UNISWAP_V2_PAIR_ABI,
    functionName: 'getReserves',
    address: uniswapV2Pair,
  });

  const { data: totalNXDBurnedData, isLoading: totalNXDBurnedDataIsLoading } =
    useReadContract({
      abi: NXD_ERC20_ABI,
      functionName: 'totalNXDBurned',
      address: NXD_ERC20_ADDRESS,
    });
  const uiTotalNXDBurned = totalNXDBurnedData
    ? divideByDecimals(totalNXDBurnedData.toString(), NXD_DECIMALS)
    : '0';
  const {
    data: totalNXDAddedToLPData,
    isLoading: totalNXDAddedToLPDataIsLoading,
  } = useReadContract({
    abi: TAX_RECIPIENT_ABI,
    functionName: 'nxdAddedToLp',
    address: TAX_RECIPIENT_ADDRESS,
  });

  const uiTotalNXDAddedToLP = totalNXDAddedToLPData
    ? divideByDecimals(totalNXDAddedToLPData.toString(), NXD_DECIMALS)
    : '0';

  const {
    data: totalDXNAddedToLPData,
    isLoading: totalDXNAddedToLPDataIsLoading,
  } = useReadContract({
    abi: TAX_RECIPIENT_ABI,
    functionName: 'dxnAddedToLp',
    address: TAX_RECIPIENT_ADDRESS,
  });

  const uiTotalDXNAddedToLP = totalDXNAddedToLPData
    ? divideByDecimals(totalDXNAddedToLPData.toString(), NXD_DECIMALS)
    : '0';

  const {
    data: totalDXNStakedFromProfitShareData,
    isLoading: totalDXNStakedFromProfitShareDataIsLoading,
  } = useReadContract({
    abi: TAX_RECIPIENT_ABI,
    functionName: 'dxnStaked',
    address: TAX_RECIPIENT_ADDRESS,
  });

  const uiTotalDXNStakedFromProfitShare = totalDXNStakedFromProfitShareData
    ? divideByDecimals(
        totalDXNStakedFromProfitShareData.toString(),
        DXN_DECIMALS
      )
    : '0';

  const isLoading = isLoadingUniswapV2Pair || isLoadingUniswapV2PairReserves;

  const uiReserve0 = uniswapV2PairReserves?.[0]
    ? divideByDecimals(uniswapV2PairReserves?.[0].toString(), NXD_DECIMALS)
    : '0';
  const uiReserve1 = uniswapV2PairReserves?.[1]
    ? divideByDecimals(uniswapV2PairReserves?.[1].toString(), NXD_DECIMALS)
    : '0';

  const nxdReserves = nxdIsToken0 ? uiReserve0 : uiReserve1;
  const dxnReserves = nxdIsToken0 ? uiReserve1 : uiReserve0;

  const { data: nxdTotalSupplyData, isLoading: nxdTotalSupplyDataIsLoading } =
    useReadContract({
      abi: NXD_ERC20_ABI,
      functionName: 'totalSupply',
      address: NXD_ERC20_ADDRESS,
    });

  const uiTotalSupply = nxdTotalSupplyData
    ? divideByDecimals(nxdTotalSupplyData.toString(), NXD_DECIMALS)
    : '0';

  const circulatingSupply = Number(uiTotalSupply) - Number(uiTotalNXDBurned);

  const nxdFloorPriceInDXN = 33.33 / circulatingSupply;

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row'>
      <div className='flex-1 pr-2 lg:pr-4'>
        <div className='p-4 lg:p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
            NXD/DXN Univ2 LP
          </h2>
          <h2 className='text-1xl font-bold text-gray-800 mb-4'>
            Buy NXD from the NXD/DXN Univ2 Locked LP
          </h2>
          <h2 className='text-xs font-bold text-gray-800'>Trade NXD/DXN</h2>

          <Link
            // href={`https://app.uniswap.org/#/swap?inputCurrency=${DXN_ERC20_ADDRESS}&outputCurrency=${NXD_ERC20_ADDRESS}&chain=mainnet`}
            href={`#`}
            // target='_blank'
            // rel='noreferrer noopener'
          >
            <button className='w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 '>
              TRADE NXD
            </button>
          </Link>

          <p className='flex-grow text-[#90A6B3] text-xs mt-6'>
            {`Click "Trade NXD" to link the Uniswap link to the NXD/DXN pair`}
          </p>
        </div>
      </div>
      <div className='flex-1 pl-4'>
        <div className='p-8'>
          <div className='flex flex-col lg:flex-row mb-4'>
            <div className='flex-1 '>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>Total TVL LP</p>
                <p className='ml-auto font-bold'>
                  {formattedNum(nxdReserves)} NXD / {formattedNum(dxnReserves)}{' '}
                  DXN /{' '}
                  {formattedNum(dxnPriceInUSD * parseInt(dxnReserves) * 2)} USD
                </p>
              </div>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>Price Floor NXD/DXN</p>
                <p className='ml-auto font-bold'>
                  1 NXD = {formattedNum(nxdFloorPriceInDXN)} DXN (
                  {formattedNum(nxdFloorPriceInDXN * dxnPriceInUSD)} USD)
                </p>
              </div>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>
                  NXD Burned from FoT 2%
                </p>
                <p className='ml-auto font-bold'>
                  {formattedNum(uiTotalNXDBurned)} NXD (
                  {formattedNum(Number(uiTotalNXDBurned) * nxdPriceInUSD)} USD)
                </p>
              </div>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>
                  NXD added to LP from FoT 0.5%
                </p>
                <p className='ml-auto font-bold'>
                  {formattedNum(uiTotalNXDAddedToLP)} NXD (
                  {formattedNum(Number(uiTotalNXDAddedToLP) * nxdPriceInUSD)}{' '}
                  USD)
                </p>
              </div>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>
                  DXN added to LP from FoT 0.5%
                </p>
                <p className='ml-auto font-bold'>
                  {formattedNum(uiTotalDXNAddedToLP)} DXN (
                  {formattedNum(Number(uiTotalDXNAddedToLP) * dxnPriceInUSD)}{' '}
                  USD)
                </p>
              </div>
              <div className='flex mb-4'>
                <p className='flex-grow text-[#90A6B3]'>
                  DXN Compounded from FoT 1.5%
                </p>
                <p className='ml-auto font-bold'>
                  {' '}
                  {formattedNum(uiTotalDXNStakedFromProfitShare)} DXN (
                  {formattedNum(
                    Number(uiTotalDXNStakedFromProfitShare) * dxnPriceInUSD
                  )}{' '}
                  USD)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Univ;
