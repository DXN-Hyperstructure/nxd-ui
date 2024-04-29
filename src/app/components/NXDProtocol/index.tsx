'use client';
import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { NXD_PROTOCOL_ABI } from '@/abis/nxdprotocol';
import { NXD_STAKING_VAULT_ABI } from '@/abis/nxdstakingvault';
import { TAX_RECIPIENT_ABI } from '@/abis/taxrecipient';
import useNXDPrice from '@/app/hooks/useNXDPrice';
import {
  DXN_DECIMALS,
  DXN_ERC20_ADDRESS,
  NXD_DECIMALS,
  NXD_ERC20_ADDRESS,
  NXD_PROTOCOL_ADDRESS,
  NXD_STAKING_VAULT_ADDRESS,
  TAX_RECIPIENT_ADDRESS,
} from '@/consts';
import { divideByDecimals, formattedNum } from '@/utils';
import React from 'react';
import { erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';
const Protocol = () => {
  const { nxdPriceInUSD, dxnPriceInUSD } = useNXDPrice();
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

  const uiTotalDXNStakedFromProfitShareUSD =
    Number(uiTotalDXNStakedFromProfitShare) * dxnPriceInUSD;

  const { data: totalDXNBurnedData, isLoading: totalDXNBurnedDataIsLoading } =
    useReadContract({
      address: NXD_PROTOCOL_ADDRESS,
      abi: NXD_PROTOCOL_ABI,
      functionName: 'totalDXNBurned',
    });

  const uiTotalDXNBurned = totalDXNBurnedData
    ? divideByDecimals(totalDXNBurnedData.toString(), DXN_DECIMALS)
    : '0';

  const uiTotalDXNBurnedUSD = formattedNum(
    Number(uiTotalDXNBurned) * dxnPriceInUSD
  );

  const { data: totalDXNStakedData, isLoading: totalDXNStakedDataIsLoading } =
    useReadContract({
      address: NXD_PROTOCOL_ADDRESS,
      abi: NXD_PROTOCOL_ABI,
      functionName: 'totalDXNStaked',
    });

  const uiTotalDXNStaked = totalDXNStakedData
    ? divideByDecimals(totalDXNStakedData.toString(), DXN_DECIMALS)
    : '0';

  const uiTotalDXNStakedUSD = formattedNum(
    Number(uiTotalDXNStaked) * dxnPriceInUSD
  );

  const {
    data: dxnTotalSupplyData,
    isLoading: dxnTotalSupplyDataIsLoading,
    error,
    refetch: refetchNXDTotalSupply,
  } = useReadContract({
    address: DXN_ERC20_ADDRESS,
    functionName: 'totalSupply',
    args: [],
    abi: erc20Abi,
  });

  const uiTotalSupply = dxnTotalSupplyData
    ? divideByDecimals(dxnTotalSupplyData.toString(), DXN_DECIMALS)
    : '0';

  const {
    data: totalNXDBurnedDataFromProtocol,
    isLoading: totalNXDBurnedDataFromProtocolIsLoading,
  } = useReadContract({
    address: NXD_PROTOCOL_ADDRESS,
    abi: NXD_PROTOCOL_ABI,
    functionName: 'totalNXDBurned',
  });

  const uiTotalNXDBurned = totalNXDBurnedDataFromProtocol
    ? divideByDecimals(totalNXDBurnedDataFromProtocol.toString(), DXN_DECIMALS)
    : '0';

  const uiTotalNXDBurnedUSD = formattedNum(
    Number(uiTotalNXDBurned) * nxdPriceInUSD
  );

  const {
    data: totalNXDBurnedFeeOnTransferData,
    isLoading: totalNXDBurnedSellDataIsLoading,
  } = useReadContract({
    abi: NXD_ERC20_ABI,
    functionName: 'totalNXDBurned',
    address: NXD_ERC20_ADDRESS,
  });
  const uiTotalNXDBurnedFeeOnTransfer = totalNXDBurnedFeeOnTransferData
    ? divideByDecimals(totalNXDBurnedFeeOnTransferData.toString(), NXD_DECIMALS)
    : '0';

  const uiTotalNXDBurnedFeeOnTransferUSD = formattedNum(
    Number(uiTotalNXDBurnedFeeOnTransfer) * nxdPriceInUSD
  );

  const {
    data: nxdPenaltyBurnedData,
    isLoading: nxdPenaltyBurnedDataIsLoading,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'nxdPenaltyBurned',
  });

  const uiNXDPenaltyBurned = nxdPenaltyBurnedData
    ? divideByDecimals(nxdPenaltyBurnedData.toString(), NXD_DECIMALS)
    : '0';

  const uiNXDPenaltyBurnedUSD = nxdPriceInUSD * Number(uiNXDPenaltyBurned);

  const totalNXDBurn =
    Number(uiTotalNXDBurned) +
    Number(uiTotalNXDBurnedFeeOnTransfer) +
    Number(uiNXDPenaltyBurned);

  const totalNXDBurnUSD = formattedNum(totalNXDBurn * nxdPriceInUSD);

  const { data: nxdTotalSupplyData, isLoading: nxdTotalSupplyDataIsLoading } =
    useReadContract({
      abi: NXD_ERC20_ABI,
      functionName: 'totalSupply',
      address: NXD_ERC20_ADDRESS,
    });

  const uiTotalSupplyNXD = nxdTotalSupplyData
    ? divideByDecimals(nxdTotalSupplyData.toString(), NXD_DECIMALS)
    : '0';

  const totalNXDBurnPerTotalSupply =
    (totalNXDBurn / Number(uiTotalSupplyNXD)) * 100;

  const circulatingSupply = Number(uiTotalSupplyNXD) - Number(totalNXDBurn);

  const nxdFloorPriceInDXN =
    (25000000 / circulatingSupply / circulatingSupply) * 1.003;

  const {
    data: totalDXNDepositedLMPData,
    isLoading: totalDXNDepositedLMPDataIsLoading,
  } = useReadContract({
    address: NXD_PROTOCOL_ADDRESS,
    abi: NXD_PROTOCOL_ABI,
    functionName: 'totalDXNDepositedLMP',
  });

  const uiTotalDXNDepositedLMP = totalDXNDepositedLMPData
    ? divideByDecimals(totalDXNDepositedLMPData.toString(), DXN_DECIMALS)
    : '0';

  const uiTotalDXNDepositedLMPUSD = formattedNum(
    Number(uiTotalDXNDepositedLMP) * dxnPriceInUSD
  );

  const totalDXnCompoundedDSVNoPS =
    Number(uiTotalDXNStaked) + Number(uiTotalDXNDepositedLMP);

  const totalDXnCompoundedDSVNoPSUSD = formattedNum(
    totalDXnCompoundedDSVNoPS * dxnPriceInUSD
  );

  const totalDXnCompoundedDSVPS =
    Number(uiTotalDXNStakedFromProfitShare) + Number(totalDXnCompoundedDSVNoPS);

  const totalDXnCompoundedDSVPSUSD = formattedNum(
    totalDXnCompoundedDSVPS * dxnPriceInUSD
  );

  // const dxnAsPercentageOfTVL =
  //   (totalDXnCompoundedDSVPS / Number(uiTotalSupply)) * 100;

  const totalDXNAsPercentageOfLMP =
    ((Number(uiTotalDXNStaked) + Number(uiTotalDXNStakedFromProfitShare)) /
      Number(uiTotalDXNDepositedLMP)) *
    100;

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row'>
      <div className='flex-1 pr-2 lg:pr-4'>
        <div className='p-4 lg:p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
            NXD Protocol Analytics
          </h2>
          <h2 className='text-1xl font-bold text-gray-800 mb-3'>
            DXN Total Value Locked in DSV
          </h2>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3] '>Total DXN Locked LMP</p>
            <p className='lg:ml-auto font-bold lg:text-right '>
              {formattedNum(uiTotalDXNDepositedLMP)} DXN (
              {uiTotalDXNDepositedLMPUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3] '>
              Total DXN Compounded DSV
            </p>
            <p className='lg:ml-auto font-bold lg:text-right '>
              {formattedNum(uiTotalDXNStaked)} DXN ({uiTotalDXNStakedUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3]'>Total DXN Compounded FoT</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalDXNStakedFromProfitShare)} DXN (
              {formattedNum(uiTotalDXNStakedFromProfitShareUSD)} USD)
            </p>
          </div>

          <div className='flex mt-10 flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Compounded as a % of LMP
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(totalDXNAsPercentageOfLMP)}%
            </p>
          </div>
          {/* <div className='flex mt-10 flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN as a % of Total Supply DXN
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(dxnAsPercentageOfTVL)}%
            </p>
          </div> */}
          {/* <hr className='border border-[#F8F9F9] mb-5' /> */}

          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Locked DXN Staking Vault
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(totalDXnCompoundedDSVPS)} DXN (
              {totalDXnCompoundedDSVPSUSD} USD)
            </p>
          </div>

          <hr className='border border-[#F8F9F9] mb-5' />

          <h2 className='text-1xl font-bold text-gray-800 mb-3'>
            DXN Total Supply Reduction by DSV
          </h2>

          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Locked DXN Staking Vault (TVL)
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(totalDXnCompoundedDSVPS)} DXN (
              {totalDXnCompoundedDSVPSUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Burned DXN Staking Vault
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalDXNBurned)} DXN ({uiTotalDXNBurnedUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>DXN Burn as % of DSV TVL</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {Number(totalDXnCompoundedDSVPS) > 0
                ? formattedNum(
                    (Number(uiTotalDXNBurned) /
                      Number(totalDXnCompoundedDSVPS)) *
                      100
                  )
                : '0'}
              %
            </p>
          </div>

          <hr className='border border-[#F8F9F9] mb-5' />

          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <div className='flex-grow'>
              <p className='text-[#90A6B3] '>
                Total Reduction of Circulating DXN Supply
              </p>
              <p className='text-[#90A6B3] text-xs'>
                (Total Locked + Total Burned / Circulating DXN)
              </p>
            </div>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(
                ((Number(totalDXnCompoundedDSVPS) + Number(uiTotalDXNBurned)) /
                  Number(uiTotalSupply)) *
                  100
              )}
              %
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1 '>
        <div className='p-4 lg:p-8'>
          <div className='flex flex-col lg:flex-row mb-4'>
            <div className='flex-1 mt-16 '>
              <h2 className='text-1xl font-bold text-gray-800 mb-3'>
                NXD Deflationary Statistics
              </h2>
              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-3'>
                <p className='flex-grow text-[#90A6B3]'>
                  Total NXD Burn DXN Staking Vault
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiTotalNXDBurned)} NXD ({uiTotalNXDBurnedUSD}{' '}
                  USD)
                </p>
              </div>
              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-3'>
                <p className='flex-grow text-[#90A6B3]'>
                  Total NXD Burn FoT 2%
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiTotalNXDBurnedFeeOnTransfer)} NXD (
                  {uiTotalNXDBurnedFeeOnTransferUSD} USD)
                </p>
              </div>
              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
                <p className='flex-grow text-[#90A6B3]'>
                  Total NXD Burn Unstaking Penalty
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {' '}
                  {formattedNum(uiNXDPenaltyBurned)} NXD (
                  {formattedNum(uiNXDPenaltyBurnedUSD)} USD)
                </p>
              </div>

              <hr className='border border-[#F8F9F9] mb-5' />

              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
                <p className='flex-grow text-[#90A6B3]'>Total NXD Burn</p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(totalNXDBurn)} NXD ({totalNXDBurnUSD} USD)
                </p>
              </div>

              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
                <p className='flex-grow text-[#90A6B3]'>
                  Total % NXD Burn of Total NXD Supply
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(totalNXDBurnPerTotalSupply)}%
                </p>
              </div>

              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
                <p className='flex-grow text-[#90A6B3]'>
                  Price Floor NXD in DXN
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {nxdFloorPriceInDXN.toFixed(8).toLocaleString()} DXN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Protocol;
