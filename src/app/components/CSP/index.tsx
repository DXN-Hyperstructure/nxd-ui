'use client';
import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { NXD_PROTOCOL_ABI } from '@/abis/nxdprotocol';
import useTokenBalance from '@/app/hooks/useTokenBalance';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DXN_DECIMALS,
  DXN_ERC20_ADDRESS,
  NXD_DECIMALS,
  NXD_ERC20_ADDRESS,
  NXD_MAX_REWARDS_SUPPLY,
  NXD_PROTOCOL_ADDRESS,
} from '@/consts';
import {
  divideByDecimals,
  formattedNum,
  handleNumberInput,
  multiplyByDecimals,
} from '@/utils';
import React, { useEffect, useState } from 'react';
import { erc20Abi, maxUint256, zeroAddress } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Countdown } from '../Countdown';
import useCurrentMintRatio from '@/app/hooks/useCurrentMintRatio';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import useToastOnWriteContractError from '@/app/hooks/useToastOnWriteContractError';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { sepolia } from 'viem/chains';
import NotificationContent from '../NotificationContent';

const CappedStakingPeriod = () => {
  const connectedUserAddress = useAccount().address;
  const queryClient = useQueryClient();

  const params = useSearchParams();

  useEffect(() => {
    // Get the referral code from the query parameters
    const ref = params.get('ref');

    if (ref) {
      setReferralCode(ref);
    }
  }, [params]);

  const {
    data: nxdTotalSupplyData,
    isLoading: isNXDTotalSupplyLoading,
    error,
    refetch: refetchNXDTotalSupply,
  } = useReadContract({
    address: NXD_ERC20_ADDRESS,
    functionName: 'totalSupply',
    args: [],
    abi: NXD_ERC20_ABI,
  });
  const {
    writeContract,
    error: writeContractError,
    data,
    isSuccess,
    isError,
    isPending,
    status,
    failureReason,
  } = useWriteContract({});

  useToastOnWriteContractError({
    isError,
    writeContractError,
  });
  useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (data)
      toast(
        <NotificationContent
          transactionHash={data}
          // transactionHash='0x41315b70ab0e7b12f0cfcecbd1d8dcaa5533a576d1222fc78540f43742aaabfe'
          action={
            buttonClicked == 'MINT'
              ? 'Mint'
              : buttonClicked == 'APPROVE'
              ? 'Approve'
              : buttonClicked == 'CLAIM'
              ? 'Claim'
              : 'Claim'
          }
          onSuccess={() => {
            refetchUserAllowance();
            refetchNXDTotalSupply();
            refetchUserTotalMintedNoBonus();
            refetchNXDBalance();
            refetchReferrerBonusReceived();
            refetchReferredBonusReceived();
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_ERC20_ADDRESS,
                  functionName: 'totalSupply',
                  chainId: 1337,
                },
              ],
            });
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_PROTOCOL_ADDRESS,
                  functionName: 'totalDXNStaked',
                  chainId: 1337,
                },
              ],
            });
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_PROTOCOL_ADDRESS,
                  functionName: 'totalDXNDepositedLMP',
                  chainId: 1337,
                },
              ],
            });
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_ERC20_ADDRESS,
                  functionName: 'totalSupply',
                  chainId: 1337,
                },
              ],
            });
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_PROTOCOL_ADDRESS,
                  functionName: 'totalDXNStaked',
                  chainId: 1337,
                },
              ],
            });
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_PROTOCOL_ADDRESS,
                  functionName: 'totalDXNDepositedLMP',
                  chainId: 1337,
                },
              ],
            });
          }}
        />,
        {
          // position: 'top-center',
          autoClose: false,
          hideProgressBar: true,
          // closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  }, [data]);

  useEffect(() => {
    refetchUserAllowance();
    refetchNXDTotalSupply();
    refetchUserTotalMintedNoBonus();
    refetchNXDBalance();
    refetchReferrerBonusReceived();
    refetchReferredBonusReceived();
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_ERC20_ADDRESS,
          functionName: 'totalSupply',
          chainId: 1337,
        },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_PROTOCOL_ADDRESS,
          functionName: 'totalDXNStaked',
          chainId: 1337,
        },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_PROTOCOL_ADDRESS,
          functionName: 'totalDXNDepositedLMP',
          chainId: 1337,
        },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_ERC20_ADDRESS,
          functionName: 'totalSupply',
          chainId: 1337,
        },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_PROTOCOL_ADDRESS,
          functionName: 'totalDXNStaked',
          chainId: 1337,
        },
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [
        'readContract',
        {
          address: NXD_PROTOCOL_ADDRESS,
          functionName: 'totalDXNDepositedLMP',
          chainId: 1337,
        },
      ],
    });
  }, [connectedUserAddress]);

  const [amountToDeposit, setAmountToDeposit] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [allowDynamicAmounts, setAllowDynamicAmounts] = useState(false);

  const { data: userAllowanceData, refetch: refetchUserAllowance } =
    useReadContract({
      address: DXN_ERC20_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [connectedUserAddress || zeroAddress, NXD_PROTOCOL_ADDRESS],
    });
  const { data: dxnData } = useReadContract({
    address: NXD_PROTOCOL_ADDRESS,
    abi: NXD_PROTOCOL_ABI,
    functionName: 'dxn',
  });
  const needsAllowance: boolean = userAllowanceData
    ? Number(divideByDecimals(userAllowanceData.toString(), DXN_DECIMALS)) <
      Number(amountToDeposit)
    : true;
  // const needsAllowance: boolean = false;
  const onMintNXDClick = () => {
    try {
      if (!amountToDeposit) return;
      setButtonClicked('MINT');
      writeContract({
        abi: NXD_PROTOCOL_ABI,
        address: NXD_PROTOCOL_ADDRESS,
        functionName: 'deposit',
        args: [
          BigInt(multiplyByDecimals(amountToDeposit, DXN_DECIMALS).toString()),
          BigInt(referralCode || '0'),
          allowDynamicAmounts,
        ],
      });
    } catch (error) {
      console.log('Error minting NXD', error);
    }
  };
  const onApproveClick = async () => {
    try {
      setButtonClicked('APPROVE');
      writeContract({
        abi: erc20Abi,
        address: DXN_ERC20_ADDRESS,
        functionName: 'approve',
        args: [NXD_PROTOCOL_ADDRESS, maxUint256],
        // chainId: 1337,
      });
    } catch (error) {
      console.log('Error approving NXD', error);
    }
  };

  const onClaimReferralBonus = () => {
    try {
      setButtonClicked('CLAIM');
      writeContract({
        abi: NXD_PROTOCOL_ABI,
        address: NXD_PROTOCOL_ADDRESS,
        functionName: 'withdrawReferralRewards',
      });
    } catch (error) {
      console.log('Error minting NXD', error);
    }
  };

  const nxdTotalSupplyUiAmount = nxdTotalSupplyData
    ? Number(divideByDecimals(nxdTotalSupplyData.toString(), NXD_DECIMALS))
    : '0';

  const {
    data: userNXDBalanceData,
    isLoading: isUserNXDBalanceLoading,
    refetch: refetchNXDBalance,
  } = useTokenBalance({
    tokenAddress: NXD_ERC20_ADDRESS,
    userAddress: connectedUserAddress,
    decimals: NXD_DECIMALS,
  });
  const { data: userDXNBalaneData, isLoading: isUserDXNBalanceLoading } =
    useTokenBalance({
      tokenAddress: DXN_ERC20_ADDRESS,
      userAddress: connectedUserAddress,
      decimals: DXN_DECIMALS,
    });

  const {
    data: totalMintedNoBonusData,
    refetch: refetchUserTotalMintedNoBonus,
  } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'userTotalMintedNoBonus',
    args: [connectedUserAddress || zeroAddress],
  });

  const { data: lmpEndTimeData } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'endTime',
  });
  const isLMPEnded =
    !lmpEndTimeData ||
    (lmpEndTimeData && Date.now() > Number(lmpEndTimeData.toString()) * 1000);

  const uiTotalMintedNoBonus = totalMintedNoBonusData
    ? divideByDecimals(totalMintedNoBonusData.toString(), NXD_DECIMALS)
    : 0;

  const { data: referrerBonusReceived, refetch: refetchReferrerBonusReceived } =
    useReadContract({
      abi: NXD_PROTOCOL_ABI,
      address: NXD_PROTOCOL_ADDRESS,
      functionName: 'referrerRewards',
      args: [connectedUserAddress || zeroAddress],
    });
  const { data: referredBonusReceived, refetch: refetchReferredBonusReceived } =
    useReadContract({
      abi: NXD_PROTOCOL_ABI,
      address: NXD_PROTOCOL_ADDRESS,
      functionName: 'referredRewards',
      args: [connectedUserAddress || zeroAddress],
    });

  const { data: userTotalBonusData, refetch: refetchUserTotalBonus } =
    useReadContract({
      abi: NXD_PROTOCOL_ABI,
      address: NXD_PROTOCOL_ADDRESS,
      functionName: 'userTotalBonus',
      args: [connectedUserAddress || zeroAddress],
    });

  const uiUserTotalBonus = userTotalBonusData
    ? divideByDecimals(userTotalBonusData.toString(), NXD_DECIMALS)
    : 0;

  const uiReferrerBonusReceived = referrerBonusReceived
    ? divideByDecimals(referrerBonusReceived.toString(), NXD_DECIMALS)
    : 0;

  const uiReferredBonusReceived = referredBonusReceived
    ? divideByDecimals(referredBonusReceived.toString(), NXD_DECIMALS)
    : 0;

  const { data: startTimeData } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'startTime',
  });
  const { data: endTimeData } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'endTime',
  });

  const currentMintRatio = useCurrentMintRatio({
    startTimeSeconds: Number(startTimeData?.toString()),
  });

  const mintStarted =
    startTimeData && Number(startTimeData.toString()) < Date.now();

  const [buttonClicked, setButtonClicked] = useState<
    'MINT' | 'APPROVE' | '' | 'CLAIM'
  >('');

  const {
    data: totalUnclaimedReferralRewardsData,
    refetch: refetchTotalUnclaimedReferralRewards,
  } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'totalUnclaimedReferralRewards',
  });

  const uiTotalUnclaimedReferralRewards = totalUnclaimedReferralRewardsData
    ? divideByDecimals(
        totalUnclaimedReferralRewardsData.toString(),
        NXD_DECIMALS
      )
    : 0;

  const remainingSupplyMintable =
    750000 -
    Number(nxdTotalSupplyUiAmount) -
    15000 -
    5000 -
    Number(uiTotalUnclaimedReferralRewards);

  const allNXDMinted = remainingSupplyMintable == 0;

  const nxdTotalClaimed: number =
    Number(nxdTotalSupplyUiAmount) -
    5000 +
    Number(uiTotalUnclaimedReferralRewards);

  const totalNxdClaimedPercentage = (
    (Number(nxdTotalClaimed) / NXD_MAX_REWARDS_SUPPLY) *
    100
  ).toFixed(5);

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex-1 pr-2 lg:pr-4'>
          <div className='p-4 lg:p-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
              Limited Mint Phase
            </h2>
            <h2 className='text-1xl font-bold text-gray-800 mb-4'>
              Mint NXD token
            </h2>
            <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
              <p className='flex-grow text-[#90A6B3] mb-2 lg:mb-0 lg:mr-10'>
                Time Remaining Mint Phase (DD/HH/MM/SS)
              </p>
              <p className='lg:ml-auto font-bold whitespace-nowrap lg:text-right'>
                {mintStarted && !isLMPEnded ? (
                  <Countdown
                    targetDate={
                      new Date(Number(endTimeData?.toString()) * 1000 || '0')
                    }
                  />
                ) : (
                  ''
                )}
                {(isLMPEnded || allNXDMinted) && startTimeData ? (
                  <span>LMP Ended</span>
                ) : (
                  ''
                )}
                {!startTimeData ? <span></span> : ''}
              </p>
            </div>
            <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
              <p className='flex-grow text-[#90A6B3]'>
                Total NXD Claimed % (inc. NXD Bonus)
              </p>
              <p className='lg:ml-auto font-bold lg:text-right'>
                {totalNxdClaimedPercentage}%
              </p>
            </div>
            <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
              <p className='flex-grow text-[#90A6B3]'>
                Total NXD Claimed (inc. NXD Bonus)
              </p>
              <p className='lg:ml-auto font-bold lg:text-right'>
                {formattedNum(nxdTotalClaimed?.toString()) || 0} /{' '}
                {formattedNum(NXD_MAX_REWARDS_SUPPLY)}
              </p>
            </div>
            <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
              <p className='flex-grow text-[#90A6B3]'>Current Mint Ratio</p>
              <p className='lg:ml-auto font-bold lg:text-right'>
                {currentMintRatio > 0 && !isLMPEnded
                  ? `1:${currentMintRatio}`
                  : ''}
                {(isLMPEnded || allNXDMinted) && startTimeData ? (
                  <span>LMP Ended</span>
                ) : (
                  ''
                )}
                {!startTimeData ? <span>Not Started</span> : ''}
              </p>
            </div>

            <hr className='border border-[#F8F9F9]' />

            <div className='flex mb-4 mt-6'>
              <p className='flex-grow text-[#90A6B3]'>DXN in Wallet</p>
              <p className='ml-auto font-bold'>
                {isUserDXNBalanceLoading ? (
                  <Skeleton className='w-[50%] h-5' />
                ) : (
                  formattedNum(userDXNBalaneData)
                )}
              </p>
            </div>
            <div className='flex mb-4'>
              <p className='flex-grow text-[#90A6B3]'>NXD in Wallet</p>
              <p className='ml-auto font-bold'>
                {isUserNXDBalanceLoading ? (
                  <Skeleton className='w-[50%] h-5' />
                ) : (
                  formattedNum(userNXDBalanceData)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='flex-1 lg:pl-4'>
          <div className='p-4 lg:p-8'>
            <div className='flex flex-col lg:flex-row mb-4'>
              <div className='w-full lg:w-3/4 lg:mr-8 relative mb-4 lg:mb-0'>
                <label
                  htmlFor='amount1'
                  className='block text-xs text-black mb-2'
                >
                  Enter Amount of DXN to Mint NXD
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='amount1'
                    placeholder='Enter amount'
                    className='rounded-md px-4 py-3 w-full bg-[#EDEFF3]'
                    onChange={(e) =>
                      handleNumberInput(e, setAmountToDeposit, true)
                    }
                    value={amountToDeposit || ''}
                  />
                  <button
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:opacity-90'
                    onClick={() => {
                      setAmountToDeposit(userDXNBalaneData);
                    }}
                  >
                    MAX
                  </button>
                </div>
              </div>
              <div className='w-full lg:w-1/4'>
                <label
                  htmlFor='link'
                  className='block text-xs text-black mb-2 whitespace-nowrap'
                >
                  Enter Referral Code Here
                </label>
                <input
                  type='text'
                  id='link'
                  placeholder='Your code'
                  className='rounded-md px-4 py-3 w-full bg-[#EDEFF3]'
                  value={referralCode || ''}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.includes('?ref=')) {
                      const code = text.split('?ref=')[1];
                      setReferralCode(code);
                    } else {
                      handleNumberInput(e, setReferralCode, false);
                    }
                  }}
                />
              </div>
            </div>

            <button
              className='w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-2 hover:opacity-90 flex items-center gap-2 justify-center'
              onClick={needsAllowance ? onApproveClick : onMintNXDClick}
              disabled={isLMPEnded || !connectedUserAddress || isPending}
            >
              {isPending &&
              (buttonClicked == 'MINT' || buttonClicked == 'APPROVE') ? (
                <Spinner />
              ) : (
                <></>
              )}
              {needsAllowance ? 'Approve' : 'MINT NXD'}
            </button>

            <div className='mt-4 lg:mt-6'>
              <div className='bg-[#F7F9FA] rounded-lg lg:px-8 lg:py-6 py-4 px-4'>
                <div className='flex flex-col lg:flex-row mb-4 lg:mb-6'>
                  <div className='flex-grow mb-2 lg:mb-0'>
                    <p className='text-black'>Your Total NXD Minted</p>
                  </div>
                  <div className='ml-auto font-bold'>
                    {formattedNum(uiTotalMintedNoBonus)}
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row mb-4 lg:mb-6'>
                  <div className='flex-grow mb-2 lg:mb-0'>
                    <p className='text-black'>Your Bonus NXD Received</p>
                  </div>
                  <div className='ml-auto flex items-center text-[#58BD7D]'>
                    {/* End of the CSP Bonus */}
                    <span className='rounded-full bg-green-500 text-white px-2 py-0.5 ml-2'>
                      {'+ '}
                      {formattedNum(uiUserTotalBonus)}
                      {' NXD'}
                    </span>
                  </div>
                </div>
                <hr className='border border-[#E5E7E9] mb-4' />
                <div className='flex flex-col lg:flex-row mb-4 lg:mb-6'>
                  <div className='flex-grow'>
                    <p className='text-black font-bold'>Total NXD Minted</p>
                  </div>
                  <div className='ml-auto font-bold'>
                    {formattedNum(
                      Number(uiReferredBonusReceived) +
                        Number(uiReferrerBonusReceived) +
                        Number(uiTotalMintedNoBonus)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4 lg:p-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>
          Claim Referral Bonus
        </h2>
        <span className='text-[#90A6B3]'>
          Claim your referral bonus from the Limited Mint Phase. Bonus can only
          be claimed after 14 days from the LMP start date.
        </span>
        <button
          className={`w-full mt-4 lg:w-full rounded-[8px] ${
            isLMPEnded && connectedUserAddress ? 'bg-[#000307]' : 'bg-[#90A6B3]'
          } text-white px-9 py-4 ${
            isLMPEnded && connectedUserAddress ? 'hover:opacity-90' : ''
          }
          ${isLMPEnded && connectedUserAddress ? '' : 'cursor-not-allowed'}
          flex items-center gap-2 justify-center`}
          onClick={onClaimReferralBonus}
          disabled={!startTimeData || !isLMPEnded || !connectedUserAddress}
        >
          {isPending && buttonClicked == 'CLAIM' ? <Spinner /> : <></>}
          Claim Bonus
        </button>
      </div>
    </div>
  );
};
export default CappedStakingPeriod;
