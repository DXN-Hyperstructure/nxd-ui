'use client';

import { DBXEN_ABI } from '@/abis/dbxen';
import { NXD_PROTOCOL_ABI } from '@/abis/nxdprotocol';
import { TAX_RECIPIENT_ABI } from '@/abis/taxrecipient';
import useNXDPrice from '@/app/hooks/useNXDPrice';
import useToastOnWriteContractError from '@/app/hooks/useToastOnWriteContractError';
import {
  DBXEN_ADDRESS,
  DXN_DECIMALS,
  DXN_ERC20_ADDRESS,
  NXD_DECIMALS,
  NXD_PROTOCOL_ADDRESS,
  NXD_STAKING_VAULT_ADDRESS,
  TAX_RECIPIENT_ADDRESS,
} from '@/consts';
import { divideByDecimals, formattedNum } from '@/utils';
import React, { useEffect } from 'react';
import { erc20Abi } from 'viem';
import { useBalance, useReadContract, useWriteContract } from 'wagmi';
import NotificationContent from '../NotificationContent';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
const DXNStaking = () => {
  const { data: currentCycleData } = useReadContract({
    address: DBXEN_ADDRESS,
    abi: DBXEN_ABI,
    functionName: 'currentCycle',
  });

  const { data: protocolStakedDXN } = useReadContract({
    address: DBXEN_ADDRESS,
    abi: DBXEN_ABI,
    functionName: 'accStakeCycle',
    args: [NXD_PROTOCOL_ADDRESS, BigInt(currentCycleData?.toString() || '0')],
  });

  const { dxnPriceInUSD, ethPriceInUSD, nxdPriceInUSD } = useNXDPrice();

  const { data: totalSupplyData } = useReadContract({
    address: DXN_ERC20_ADDRESS,
    abi: erc20Abi,
    functionName: 'totalSupply',
  });

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

  const {
    data: totalDXNStakedCompoundedData,
    isLoading: totalDXNStakedCompoundedDataIsLoading,
  } = useReadContract({
    address: TAX_RECIPIENT_ADDRESS,
    abi: TAX_RECIPIENT_ABI,
    functionName: 'dxnStaked',
  });

  const uiTotalDXNStakedCompounded = totalDXNStakedCompoundedData
    ? divideByDecimals(totalDXNStakedCompoundedData.toString(), DXN_DECIMALS)
    : '0';

  const uiTotalDXNStakedCompoundedUSD = formattedNum(
    Number(uiTotalDXNStakedCompounded) * dxnPriceInUSD
  );

  const compoundedAsPercentageOfCSP = formattedNum(
    (Number(uiTotalDXNStakedCompounded) / Number(uiTotalDXNDepositedLMP)) * 100
  );

  const uiTotalSupply = totalSupplyData
    ? divideByDecimals(totalSupplyData.toString(), DXN_DECIMALS)
    : '0';

  const { data: totalDXNStakedData, isLoading: totalDXNStakedDataIsLoading } =
    useReadContract({
      address: NXD_PROTOCOL_ADDRESS,
      abi: NXD_PROTOCOL_ABI,
      functionName: 'totalDXNStaked',
    });

  const uiTotalDXNStakedDistributionStrat = totalDXNStakedData
    ? Number(divideByDecimals(totalDXNStakedData.toString(), DXN_DECIMALS))
    : '0';

  const uiTotalDXNStakedDistributionStratUSD = formattedNum(
    Number(uiTotalDXNStakedDistributionStrat) * dxnPriceInUSD
  );

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

  const { data: totalNXDBurnedData, isLoading: totalNXDBurnedDataIsLoading } =
    useReadContract({
      address: NXD_PROTOCOL_ADDRESS,
      abi: NXD_PROTOCOL_ABI,
      functionName: 'totalNXDBurned',
    });

  const uiTotalNXDBurned = totalNXDBurnedData
    ? divideByDecimals(totalNXDBurnedData.toString(), NXD_DECIMALS)
    : '0';

  const uiTotalNXDBurnedUSD = formattedNum(
    Number(uiTotalNXDBurned) * nxdPriceInUSD
  );

  const {
    data: ethToStakingVaultData,
    isLoading: ethToStakingVaultDataIsLoading,
  } = useReadContract({
    address: NXD_PROTOCOL_ADDRESS,
    abi: NXD_PROTOCOL_ABI,
    functionName: 'totalETHToStakingVault',
  });

  const uiEthToStakingVault = ethToStakingVaultData
    ? divideByDecimals(ethToStakingVaultData.toString(), 18)
    : '0';

  const uiEthToStakingVaultUSD = formattedNum(
    Number(uiEthToStakingVault) * ethPriceInUSD
  );

  const {
    data: availableEthForDistributionData,
    isLoading: availableEthForDistributionDataIsLoading,
  } = useBalance({
    address: NXD_STAKING_VAULT_ADDRESS,
  });

  const uiAvailableEthForDistribution = availableEthForDistributionData
    ? divideByDecimals(availableEthForDistributionData.toString(), 18)
    : '0';

  const uiAvailableEthForDistributionUSD = formattedNum(
    Number(uiAvailableEthForDistribution) * ethPriceInUSD
  );

  const uiTotalDXNStaked =
    Number(uiTotalDXNDepositedLMP) + Number(uiTotalDXNStakedCompounded);

  const uiTotalDXNStakedUSD = formattedNum(
    Number(uiTotalDXNStaked) * dxnPriceInUSD
  );

  const {
    data: ourClaimableFeesData,
    isLoading: ourClaimableFeesDataIsLoading,
  } = useReadContract({
    address: NXD_PROTOCOL_ADDRESS,
    abi: NXD_PROTOCOL_ABI,
    functionName: 'ourClaimableFees',
  });

  const uiOurClaimableFees = ourClaimableFeesData
    ? divideByDecimals(ourClaimableFeesData.toString(), 18)
    : '0';

  const uiOurClaimableFeesUSD = formattedNum(
    Number(uiOurClaimableFees) * ethPriceInUSD
  );

  const {
    writeContract,
    error: writeContractError,
    data: writeContractData,
    isSuccess,
    isError,
    isPending,
    status,
    failureReason,
  } = useWriteContract({});
  const onClaim = () => {
    try {
      writeContract({
        abi: NXD_PROTOCOL_ABI,
        address: NXD_PROTOCOL_ADDRESS,
        functionName: 'collectFees',
        args: [],
      });
    } catch (error) {}
  };
  useToastOnWriteContractError({
    writeContractError,
    isError,
  });
  useEffect(() => {
    if (writeContractData)
      toast(
        <NotificationContent
          transactionHash={writeContractData}
          action={'Claim'}
          onSuccess={() => {}}
        />,
        {
          autoClose: false,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  }, [writeContractData]);
  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row'>
      <div className='flex-1 pr-2 lg:pr-4'>
        <div className='p-4 lg:p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
            DXN Staking Vault
          </h2>
          <h2 className='text-1xl font-bold text-gray-800 mb-3'>
            DXN Holdings TVL Overview
          </h2>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Staked Limited Mint Phase
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalDXNDepositedLMP)} DXN (
              {formattedNum(Number(uiTotalDXNDepositedLMP) * dxnPriceInUSD)}{' '}
              USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3]'>
              Total DXN Staked Compounded
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalDXNStakedCompounded)} DXN (
              {uiTotalDXNStakedCompoundedUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-5'>
            <p className='flex-grow text-[#90A6B3]'>Compounded as a % of LMP</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {compoundedAsPercentageOfCSP}%
            </p>
          </div>

          <hr className='border border-[#F8F9F9] mb-5' />

          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-2'>
            <p className='flex-grow text-[#90A6B3]'>Total DXN Staked</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalDXNStaked)} DXN ({uiTotalDXNStakedUSD} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>
              As a % of Total DXN Supply
            </p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(
                (Number(uiTotalDXNStaked) / Number(uiTotalSupply)) * 100
              )}
              %
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1 lg:pl-4'>
        <div className='p-4 lg:p-8'>
          <div className='flex flex-col lg:flex-row mb-4'>
            <div className='flex-1 mt-16'>
              <h2 className='text-1xl font-bold text-gray-800 mb-3'>
                ETH Distribution Strategy
              </h2>
              <h2 className='text-xs font-bold text-gray-800 mb-3'>
                Total ETH Distributed
              </h2>

              <div className='flex flex-col gap-1 lg:flex-row mb-3'>
                <p className='flex-grow text-[#90A6B3]'>DXN Compounded</p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiTotalDXNStakedDistributionStrat)} DXN (
                  {uiTotalDXNStakedDistributionStratUSD} USD)
                </p>
              </div>
              <div className='flex flex-col gap-1 lg:flex-row mb-3'>
                <p className='flex-grow text-[#90A6B3]'>DXN Burned</p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiTotalDXNBurned)} DXN ({uiTotalDXNBurnedUSD}{' '}
                  USD)
                </p>
              </div>
              <div className='flex flex-col gap-1 lg:flex-row mb-3'>
                <p className='flex-grow text-[#90A6B3]'>NXD Burned</p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiTotalNXDBurned)} NXD ({uiTotalNXDBurnedUSD}{' '}
                  USD)
                </p>
              </div>
              <div className='flex flex-col gap-1 lg:flex-row mb-5'>
                <p className='flex-grow text-[#90A6B3]'>NXD Staking Vault</p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiEthToStakingVault)} ETH (
                  {formattedNum(Number(uiEthToStakingVaultUSD))} USD)
                </p>
              </div>

              <hr className='border border-[#F8F9F9] mb-5' />

              <div className='flex flex-col gap-1 lg:flex-row mb-2'>
                <p className='flex-grow text-[#90A6B3]'>
                  ETH Currently Available for Distribution
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiOurClaimableFees)} ETH (
                  {uiOurClaimableFeesUSD} USD)
                </p>
              </div>
              <button
                className={`w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 ${
                  !isPending && uiOurClaimableFees != '0'
                    ? 'hover:opacity-90'
                    : 'cursor-not-allowed opacity-50'
                } flex items-center gap-2 justify-center`}
                onClick={onClaim}
                disabled={isPending || uiOurClaimableFees === '0'}
              >
                {isPending ? <Spinner /> : <></>}
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DXNStaking;
