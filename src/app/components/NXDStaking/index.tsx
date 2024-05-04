'use client';
import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { NXD_STAKING_VAULT_ABI } from '@/abis/nxdstakingvault';
import useNXDPrice from '@/app/hooks/useNXDPrice';
import useToastOnWriteContractError from '@/app/hooks/useToastOnWriteContractError';
import useTokenBalance from '@/app/hooks/useTokenBalance';
import {
  NXD_DECIMALS,
  NXD_ERC20_ADDRESS,
  NXD_PROTOCOL_ADDRESS,
  NXD_STAKING_VAULT_ADDRESS,
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
  useBalance,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import Spinner from '../Spinner';
import { Countdown } from '../Countdown';
import NotificationContent from '../NotificationContent';
import { toast } from 'react-toastify';
import { NXD_PROTOCOL_ABI } from '@/abis/nxdprotocol';

const NXDStaking = () => {
  const { nxdPriceInUSD } = useNXDPrice();

  const {
    data: totalStakedData,
    isLoading: isTotalStakedLoading,
    refetch: refetchTotalStaked,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'totalStaked',
  });

  const uiTotalStakedData = totalStakedData
    ? divideByDecimals(totalStakedData.toString(), NXD_DECIMALS)
    : '0';

  const uiTotalStakedDataUSD = nxdPriceInUSD * Number(uiTotalStakedData);

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
  const connectedUserAddress = useAccount().address;

  const {
    data: userNXDBalanceData,
    isLoading: isUserNXDBalanceLoading,
    refetch: refetchUserNxdBalance,
  } = useTokenBalance({
    tokenAddress: NXD_ERC20_ADDRESS,
    userAddress: connectedUserAddress,
    decimals: NXD_DECIMALS,
  });

  const nxdTotalSupplyUiAmount = nxdTotalSupplyData
    ? Number(divideByDecimals(nxdTotalSupplyData.toString(), NXD_DECIMALS))
    : '0';

  const [amountToStake, setAmountToStake] = useState('');
  const [amountToUnstake, setAmountToUnstake] = useState('');

  const {
    data: withdrawalRequestsData,
    isLoading: withdrawalRequestsDataIsLoading,
    refetch: refetchWithdrawalRequestsData,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'withdrawalRequests',
    args: [BigInt(0), connectedUserAddress || zeroAddress],
  });

  const userWithdrawalRequest = withdrawalRequestsData
    ? {
        amount: divideByDecimals(
          withdrawalRequestsData?.[0]?.toString(),
          NXD_DECIMALS
        ),
        canWithdrawAfterTimestamp: Number(withdrawalRequestsData[1].toString()),
      }
    : null;

  const {
    writeContract,
    error: writeContractError,
    data: writeContractData,
    isSuccess,
    isError,
    isPending,
    status,
    failureReason,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        refetchUserNxdBalance();
        refetchNXDTotalSupply();
        refetchTotalStaked();
        refetchUserAllowance();
        refetchUserStakedNXDData();
        refetchUserPendingETHData();
        refetchWithdrawalRequestsData();
      },
    },
  });

  useToastOnWriteContractError({
    writeContractError,
    isError,
  });

  useEffect(() => {
    if (writeContractData)
      toast(
        <NotificationContent
          transactionHash={writeContractData}
          // transactionHash='0x41315b70ab0e7b12f0cfcecbd1d8dcaa5533a576d1222fc78540f43742aaabfe'
          action={
            buttonClicked == 'APPROVE'
              ? 'Approve'
              : buttonClicked == 'STAKE'
              ? 'Stake NXD'
              : buttonClicked == 'UNSTAKE'
              ? 'Unstake'
              : buttonClicked == 'UNSTAKE WITH PENALTY'
              ? 'Unstake With Penalty'
              : buttonClicked == 'CLAIM'
              ? 'Claim'
              : 'Claim'
          }
          onSuccess={() => {
            refetchUserNxdBalance();
            refetchNXDTotalSupply();
            refetchTotalStaked();
            refetchUserAllowance();
            refetchUserStakedNXDData();
            refetchUserPendingETHData();
            refetchWithdrawalRequestsData();
            refetchNXDPenaltyBurnedData();
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
  }, [writeContractData]);

  const { data: userAllowanceData, refetch: refetchUserAllowance } =
    useReadContract({
      address: NXD_ERC20_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [connectedUserAddress || zeroAddress, NXD_STAKING_VAULT_ADDRESS],
    });
  const needsAllowance: boolean = userAllowanceData
    ? Number(divideByDecimals(userAllowanceData.toString(), NXD_DECIMALS)) <
      Number(amountToStake)
    : true;

  const onApproveClick = async () => {
    setButtonClicked('APPROVE');
    try {
      writeContract({
        abi: erc20Abi,
        address: NXD_ERC20_ADDRESS,
        functionName: 'approve',
        args: [NXD_STAKING_VAULT_ADDRESS, maxUint256],
      });
    } catch (error) {
      console.log('Error approving NXD', error);
    }
  };

  const onStakeNXD = () => {
    if (amountToStake == '' || Number(amountToStake) <= 0) {
      return;
    }
    setButtonClicked('STAKE');
    writeContract({
      abi: NXD_STAKING_VAULT_ABI,
      address: NXD_STAKING_VAULT_ADDRESS,
      functionName: 'deposit',
      args: [
        BigInt(0),
        BigInt(multiplyByDecimals(amountToStake, NXD_DECIMALS)),
      ],
    });
  };

  const {
    data: userStakedNXDData,
    isLoading: userStakedNXDDataIsLoading,
    refetch: refetchUserStakedNXDData,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'userInfo',
    args: [BigInt(0), connectedUserAddress || zeroAddress],
  });

  const uiUserStakedNXD = userStakedNXDData
    ? divideByDecimals(userStakedNXDData?.[0].toString(), NXD_DECIMALS)
    : '0';

  const uiUserRewardDebt = userStakedNXDData
    ? divideByDecimals(userStakedNXDData?.[1].toString(), 18)
    : '0';

  const {
    data: nxdPenaltyBurnedData,
    isLoading: nxdPenaltyBurnedDataIsLoading,
    refetch: refetchNXDPenaltyBurnedData,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'nxdPenaltyBurned',
  });

  const uiNXDPenaltyBurned = nxdPenaltyBurnedData
    ? divideByDecimals(nxdPenaltyBurnedData.toString(), NXD_DECIMALS)
    : '0';

  const uiNXDPenaltyBurnedUSD = nxdPriceInUSD * Number(uiNXDPenaltyBurned);

  const {
    data: userPendingETHData,
    isLoading: userPendingETHDataIsLoading,
    refetch: refetchUserPendingETHData,
  } = useReadContract({
    address: NXD_STAKING_VAULT_ADDRESS,
    abi: NXD_STAKING_VAULT_ABI,
    functionName: 'pendingETH',
    args: [BigInt(0), connectedUserAddress || zeroAddress],
  });

  const uiUserPendingETH = userPendingETHData
    ? divideByDecimals(userPendingETHData.toString(), 18)
    : '0';

  const onUnstakeNXD = (
    acceptsPenaltyOnWithdraw: boolean,
    isCooldownClaim = false
  ) => {
    if (
      !isCooldownClaim &&
      (amountToUnstake == '' || Number(amountToUnstake) <= 0)
    ) {
      return;
    }
    setButtonClicked(
      acceptsPenaltyOnWithdraw ? 'UNSTAKE WITH PENALTY' : 'UNSTAKE'
    );

    writeContract({
      abi: NXD_STAKING_VAULT_ABI,
      address: NXD_STAKING_VAULT_ADDRESS,
      functionName: 'withdraw',
      args: [
        BigInt(0),
        BigInt(
          isCooldownClaim
            ? withdrawalRequestsData?.[0]?.toString() || '0'
            : multiplyByDecimals(amountToUnstake, NXD_DECIMALS)
        ),
        acceptsPenaltyOnWithdraw,
      ],
    });
  };

  const onWithdrawCooldown = () => {
    setButtonClicked('UNSTAKE');
    writeContract({
      abi: NXD_STAKING_VAULT_ABI,
      address: NXD_STAKING_VAULT_ADDRESS,
      functionName: 'withdrawCooldown',
      args: [BigInt(0)],
    });
  };

  const onClaimETH = () => {
    setButtonClicked('CLAIM');
    writeContract({
      abi: NXD_STAKING_VAULT_ABI,
      address: NXD_STAKING_VAULT_ADDRESS,
      functionName: 'deposit',
      args: [BigInt(0), BigInt(0)],
    });
  };

  const [buttonClicked, setButtonClicked] = useState<
    'STAKE' | 'APPROVE' | '' | 'UNSTAKE' | 'UNSTAKE WITH PENALTY' | 'CLAIM'
  >('');

  const { data: poolInfoData, isLoading: poolInfoDataIsLoading } =
    useReadContract({
      address: NXD_STAKING_VAULT_ADDRESS,
      abi: NXD_STAKING_VAULT_ABI,
      functionName: 'poolInfo',
      args: [BigInt(0)],
    });

  const { data: pendingRewardsData, isLoading: pendingRewardsDataIsLoading } =
    useReadContract({
      address: NXD_STAKING_VAULT_ADDRESS,
      abi: NXD_STAKING_VAULT_ABI,
      functionName: 'pendingRewards',
    });

  const uiPendingRewards = pendingRewardsData
    ? divideByDecimals(pendingRewardsData.toString(), 18)
    : '0';

  const {
    data: nxdStakingEthBalance,
    isLoading: nxdStakingEthBalanceIsLoading,
  } = useBalance({
    address: NXD_STAKING_VAULT_ADDRESS,
  });

  const uiAccEthPerShare = poolInfoData
    ? divideByDecimals(poolInfoData[2].toString(), 12)
    : '0';
  const newAccEthPerShare =
    Number(uiAccEthPerShare) +
    Number(uiPendingRewards) / Number(uiTotalStakedData);

  const uiUserPendingRewards = userStakedNXDData
    ? Number(uiUserStakedNXD) * newAccEthPerShare - Number(uiUserRewardDebt)
    : 0;

  const { data: startTimeData } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'startTime',
  });

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row'>
      <div className='flex-1 pr-2 lg:pr-4'>
        <div className='p-2 lg:p-8'>
          <h2 className='text-3xl font-bold text-gray-800 lg:mb-8'>
            NXD Staking Vault
          </h2>
          <h2 className='text-1xl font-bold text-gray-800 mb-4'>
            Stake NXD token to earn ETH from DXN Daily Auctions
          </h2>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>Total NXD Staked</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(uiTotalStakedData)} NXD (
              {formattedNum(uiTotalStakedDataUSD)} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>
              Total NXD Staked of Total NXD Supply:
            </p>
            <p className='lg:sml-auto font-bold lg:text-right'>
              {Number(nxdTotalSupplyUiAmount) > 0
                ? (
                    (Number(uiTotalStakedData) /
                      Number(nxdTotalSupplyUiAmount)) *
                    100
                  )
                    .toFixed(6)
                    .toString()
                : 0}
              %
            </p>
          </div>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-4'>
            Stake NXD
          </h2>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-[#90A6B3]'>NXD in Wallet</p>
            <p className='lg:ml-auto font-bold lg:text-right'>
              {formattedNum(userNXDBalanceData)} NXD (
              {formattedNum(
                nxdPriceInUSD * Number(userNXDBalanceData.toString())
              )}{' '}
              USD)
            </p>
          </div>

          <div className='w-full lg:w-full lg:mr-8 relative mb-4 lg:mb-0'>
            <label htmlFor='amount1' className='block text-xs text-black mb-2'>
              Enter Amount of NXD to Stake
            </label>
            <div className='relative'>
              <input
                type='text'
                id='amount1'
                placeholder='Enter amount to stake'
                className='rounded-md px-4 py-3 w-full bg-[#EDEFF3]'
                value={amountToStake}
                onChange={(e) => handleNumberInput(e, setAmountToStake, true)}
              />
              <button
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:opacity-90'
                onClick={() => {
                  setAmountToStake(userNXDBalanceData.toString());
                }}
              >
                MAX
              </button>
            </div>
          </div>

          <button
            className='w-full flex items-center gap-2 lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 justify-center hover:opacity-90'
            onClick={needsAllowance ? onApproveClick : onStakeNXD}
            disabled={
              !startTimeData ||
              (isPending &&
                (buttonClicked == 'STAKE' || buttonClicked == 'APPROVE'))
            }
          >
            {isPending &&
            (buttonClicked == 'STAKE' || buttonClicked == 'APPROVE') ? (
              <Spinner />
            ) : (
              <></>
            )}
            {needsAllowance ? 'Approve' : 'STAKE NXD'}
          </button>

          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4 mt-4'>
            <p className='flex-grow font-bold text-black'>Your Staked NXD</p>
            <p className='lg:ml-auto font-bold text-[#58BD7D] lg:text-right'>
              {formattedNum(uiUserStakedNXD)} NXD (
              {formattedNum(Number(uiUserStakedNXD) * nxdPriceInUSD)} USD)
            </p>
          </div>
          <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
            <p className='flex-grow text-black font-bold'>Claimable ETH</p>
            <p className='lg:ml-auto font-bold text-[#58BD7D] lg:text-right'>
              {uiUserPendingRewards.toFixed(8).toLocaleString()} ETH
            </p>
          </div>
          <button
            className='w-full lg:w-full rounded-[8px] bg-[#58BD7D] text-white px-9 py-4 mt-1 hover:opacity-90 flex items-center gap-2 justify-center'
            onClick={onClaimETH}
            disabled={!startTimeData || (isPending && buttonClicked == 'CLAIM')}
          >
            {isPending && buttonClicked == 'CLAIM' ? <Spinner /> : <></>}
            CLAIM ETH
          </button>
        </div>
      </div>

      <div className='flex-1 lg:pl-4'>
        <div className='p-4 lg:p-8'>
          <div className='flex flex-col lg:flex-row mb-4'>
            <div className='flex-1 mt-14'>
              <h2 className='text-1xl font-bold text-gray-800 mb-4 mt-4'>
                Unstake NXD
              </h2>
              {userWithdrawalRequest &&
              userWithdrawalRequest.canWithdrawAfterTimestamp > 0 ? (
                <>
                  <div className='flex flex-col'>
                    <div className='flex mb-4'>
                      <p className='flex-grow text-[#90A6B3]'>
                        Unstaking Timer
                      </p>
                      <p className='ml-auto font-bold'>
                        <Countdown
                          targetDate={
                            new Date(
                              Number(
                                userWithdrawalRequest.canWithdrawAfterTimestamp.toString()
                              ) * 1000 || '0'
                            )
                          }
                        />
                      </p>
                    </div>
                    <div className='flex mb-4'>
                      <p className='flex-grow text-[#90A6B3]'>Amount</p>
                      <p className='ml-auto font-bold text-right'>
                        {userWithdrawalRequest.amount} NXD
                      </p>
                    </div>
                    {userWithdrawalRequest.canWithdrawAfterTimestamp <
                      new Date().getTime() / 1000 && (
                      <button
                        className='w-full lg:w-full rounded-[8px] bg-[#000307] mb-5 text-white flex gap-2 items-center justify-center px-9 py-4 mt-6 hover:opacity-90'
                        disabled={
                          !startTimeData ||
                          (isPending && buttonClicked == 'UNSTAKE')
                        }
                        onClick={() => {
                          onWithdrawCooldown();
                        }}
                      >
                        {isPending && buttonClicked == 'UNSTAKE' ? (
                          <Spinner />
                        ) : (
                          <></>
                        )}
                        UNSTAKE NXD
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className='w-full lg:w-full lg:mr-8 relative mb-4 lg:mb-0'>
                  <label
                    htmlFor='amount1'
                    className='block text-xs text-black mb-2'
                  >
                    Enter Amount of NXD to Unstake
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Enter amount to unstake'
                      className='rounded-md px-4 py-3 w-full bg-[#EDEFF3]'
                      value={amountToUnstake}
                      onChange={(e) =>
                        handleNumberInput(e, setAmountToUnstake, true)
                      }
                    />
                    <button
                      className='absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:opacity-90'
                      onClick={() => {
                        setAmountToUnstake(uiUserStakedNXD);
                      }}
                    >
                      MAX
                    </button>
                  </div>
                  <button
                    className='w-full lg:w-full rounded-[8px] bg-[#000307] mb-5 text-white flex gap-2 items-center justify-center px-9 py-4 mt-6 hover:opacity-90'
                    disabled={
                      !startTimeData ||
                      (isPending && buttonClicked == 'UNSTAKE')
                    }
                    onClick={() => {
                      onUnstakeNXD(false);
                    }}
                  >
                    {isPending && buttonClicked == 'UNSTAKE' ? (
                      <Spinner />
                    ) : (
                      <></>
                    )}
                    UNSTAKE NXD
                  </button>
                </div>
              )}

              <hr className='border border-[#F8F9F9]' />

              <h2 className='text-1xl font-bold text-gray-800 mb-4 mt-4'>
                Unstaking triggers a 24h Waiting Phase
              </h2>

              <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                <p className='flex-grow text-[#90A6B3]'>
                  NXD burned from early withdrawal penalty
                </p>
                <p className='lg:ml-auto font-bold lg:text-right'>
                  {formattedNum(uiNXDPenaltyBurned)} NXD (
                  {formattedNum(uiNXDPenaltyBurnedUSD)} USD)
                </p>
              </div>

              {userWithdrawalRequest &&
              userWithdrawalRequest.canWithdrawAfterTimestamp > 0 ? (
                <></>
              ) : (
                <button
                  className='w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 hover:opacity-90 flex items-center gap-2 justify-center'
                  disabled={
                    !startTimeData ||
                    (isPending && buttonClicked == 'UNSTAKE WITH PENALTY')
                  }
                  onClick={() => {
                    onUnstakeNXD(true);
                  }}
                >
                  {isPending && buttonClicked == 'UNSTAKE WITH PENALTY' ? (
                    <Spinner />
                  ) : (
                    <></>
                  )}
                  PENALTY UNSTAKE NXD
                </button>
              )}

              <p className='flex-grow text-[#90A6B3] text-xs mt-6'>
                Unstaking triggers a 24h Waiting Period, this Waiting Period can
                be foregone by taking a 25% on your Unstaked NXD to receive your
                NXD directly into your wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NXDStaking;
