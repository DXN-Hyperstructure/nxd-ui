'use client';
import { NXD_ERC20_ABI } from '@/abis/nxderc20';
import { TAX_RECIPIENT_ABI } from '@/abis/taxrecipient';
import { UNISWAP_V2_PAIR_ABI } from '@/abis/uniswapv2pair';
import useNXDPrice from '@/app/hooks/useNXDPrice';
import useToastOnWriteContractError from '@/app/hooks/useToastOnWriteContractError';
import useTokenBalance from '@/app/hooks/useTokenBalance';
import {
  DXN_DECIMALS,
  DXN_ERC20_ADDRESS,
  LP_GATEWAY_ADDRESS,
  NXD_DECIMALS,
  NXD_DXN_UNI_LP_ADDRESS,
  NXD_ERC20_ADDRESS,
  TAX_RECIPIENT_ADDRESS,
} from '@/consts';
import {
  divideByDecimals,
  formattedNum,
  handleNumberInput,
  multiplyByDecimals,
} from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Address, erc20Abi, maxUint256, zeroAddress } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import NotificationContent from '../NotificationContent';
import { LP_GATEWAY_ABI } from '@/abis/lpgateway';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { useQueryClient } from '@tanstack/react-query';

const LiquidityTokenInput = ({
  amount,
  setAmount,
  tokenSymbol = 'NXD',
  onUpdate,
  balance,
  btnColor,
}: {
  amount: string | null;
  setAmount: (value: string | null) => void;
  tokenSymbol?: string;
  onUpdate: () => void;
  balance: string;
  btnColor: string;
}) => {
  return (
    <div className='grid grid-flow-row md:grid-cols-[2fr,1fr] gap-5  '>
      <div className='flex flex-col gap-2'>
        <span className='text-[12px]'>Enter the amount</span>
        <div className='bg-[#EDEFF3] rounded-[8px] px-3 py-2 w-full flex items-center h-[56px] justify-between'>
          <input
            type='text'
            className='bg-[#EDEFF3] outline-none w-full font-bold'
            placeholder='0'
            value={amount || ''}
            onChange={(e) => {
              handleNumberInput(e, setAmount, true);
              onUpdate();
            }}
          />
          <button
            className={`bg-[${btnColor}] px-4 py-2 text-white rounded-[3px] `}
          >
            {tokenSymbol}
          </button>
        </div>
      </div>
      <div className='relative'>
        <span className='text-[12px]'>Balance</span>
        <div className='bg-[#EDEFF3] rounded-[8px] px-3 py-2 w-full flex items-center justify-between h-[56px]'>
          {formattedNum(balance)}
          <button
            className='pr-3 text-blue-500 hover:opacity-90'
            onClick={() => {
              setAmount(balance);
              onUpdate();
            }}
          >
            MAX
          </button>
        </div>
      </div>
    </div>
  );
};

const AddLiquidity = ({
  amountNXD,
  setAmountNXD,
  amountOtherToken,
  setAmountOtherToken,
  setUserUpdatedAmountNXD,
  userPoolShare,
}: {
  amountNXD: string | null;
  setAmountNXD: (value: string | null) => void;
  amountOtherToken: string | null;
  setAmountOtherToken: (value: string | null) => void;
  setUserUpdatedAmountNXD: (value: boolean) => void;
  userPoolShare: number;
}) => {
  const connectedUserAddress = useAccount().address;
  const queryClient = useQueryClient();

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
  useEffect(() => {
    if (data)
      toast(
        <NotificationContent
          transactionHash={data}
          action={buttonClicked}
          onSuccess={() => {
            refetchNXDBalance();
            refetchDXNBalance();
            refetchUserDXNAllowance();
            refetchUserNXDAllowance();
            queryClient.invalidateQueries({
              queryKey: [
                'readContract',
                {
                  address: NXD_DXN_UNI_LP_ADDRESS,
                  functionName: 'balanceOf',
                  args: [connectedUserAddress || zeroAddress],
                },
              ],
            });
          }}
        />,
        {
          autoClose: false,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  }, [data]);

  const {
    data: userNXDBalanceData,
    isLoading: isUserNXDBalanceLoading,
    refetch: refetchNXDBalance,
  } = useTokenBalance({
    tokenAddress: NXD_ERC20_ADDRESS,
    userAddress: connectedUserAddress,
    decimals: NXD_DECIMALS,
  });
  const {
    data: userDXNBalaneData,
    isLoading: isUserDXNBalanceLoading,
    refetch: refetchDXNBalance,
  } = useTokenBalance({
    tokenAddress: DXN_ERC20_ADDRESS,
    userAddress: connectedUserAddress,
    decimals: DXN_DECIMALS,
  });

  const { nxdPriceInDXN } = useNXDPrice();

  const amountNXDMin = amountNXD ? (Number(amountNXD) * 0.99).toString() : '0';
  const amountNXDMinDecimals = multiplyByDecimals(
    amountNXDMin || '0',
    NXD_DECIMALS
  );
  const amountOtherTokenMin = amountOtherToken
    ? (Number(amountOtherToken) * 0.99).toString()
    : '0';
  const amountOtherTokenMinDecimals = multiplyByDecimals(
    amountOtherTokenMin || '0',
    DXN_DECIMALS
  );
  // deadline is 18 mins
  const deadline = Math.floor(Date.now() / 1000) + 1080;
  const amountNXDDecimals = multiplyByDecimals(amountNXD || '0', NXD_DECIMALS);
  const amountOtherDecimals = multiplyByDecimals(
    amountOtherToken || '0',
    DXN_DECIMALS
  );

  const onAddLiquidity = () => {
    setButtonClicked('Add Liquidity');
    writeContract({
      abi: LP_GATEWAY_ABI,
      address: LP_GATEWAY_ADDRESS,
      functionName: 'addLiquidity',
      args: [
        DXN_ERC20_ADDRESS,
        BigInt(amountNXDDecimals?.toString() || '0'),
        BigInt(amountOtherDecimals?.toString() || '0'),
        BigInt(amountNXDMinDecimals),
        BigInt(amountOtherTokenMinDecimals),
        connectedUserAddress,
        deadline,
      ],
    });
  };

  const { data: userDXNAllowanceData, refetch: refetchUserDXNAllowance } =
    useReadContract({
      address: DXN_ERC20_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [connectedUserAddress || zeroAddress, LP_GATEWAY_ADDRESS],
    });

  const needsAllowanceDXN: boolean = userDXNAllowanceData
    ? Number(divideByDecimals(userDXNAllowanceData.toString(), DXN_DECIMALS)) <
      Number(amountOtherToken || '0')
    : true;

  const { data: userNXDAllowanceData, refetch: refetchUserNXDAllowance } =
    useReadContract({
      address: NXD_ERC20_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [connectedUserAddress || zeroAddress, LP_GATEWAY_ADDRESS],
    });

  const needsAllowanceNXD: boolean = userNXDAllowanceData
    ? Number(divideByDecimals(userNXDAllowanceData.toString(), NXD_DECIMALS)) <
      Number(amountNXD || '0')
    : true;

  const onApproveClick = async () => {
    try {
      setButtonClicked(needsAllowanceNXD ? 'Approve NXD' : 'Approve DXN');
      writeContract({
        abi: erc20Abi,
        address: needsAllowanceNXD ? NXD_ERC20_ADDRESS : DXN_ERC20_ADDRESS,
        functionName: 'approve',
        args: [LP_GATEWAY_ADDRESS, maxUint256],
      });
    } catch (error) {
      console.log('Error approving NXD', error);
    }
  };

  const [buttonClicked, setButtonClicked] = useState<
    'Approve NXD' | 'Approve DXN' | 'Add Liquidity'
  >('Approve NXD');

  return (
    <div className='flex flex-col md:flex-row gap-2 items-start'>
      <div className='min-w-[50%]'>
        <div className='flex flex-col gap-6 p-4 lg:p-8 lg:py-0'>
          <h2 className='text-3xl font-bold text-gray-800'>Add Liquidity</h2>
          <p className='flex-grow text-[#90A6B3] text-xs '>
            Tip: When you add liquidity, you will receive pool tokens
            representing your position. These tokens automatically earn fees
            proportional to your share of the pool, and can be redeemed at any
            time.
          </p>
          <div className='flex flex-col gap-4'>
            <LiquidityTokenInput
              amount={amountNXD}
              setAmount={setAmountNXD}
              btnColor='#58BD7D'
              onUpdate={() => {
                setUserUpdatedAmountNXD(true);
              }}
              balance={userNXDBalanceData ? userNXDBalanceData : '0'}
            />
            <Image
              src={'/plus-sign-nxd.svg'}
              alt='arrow'
              height={27}
              width={27}
              className=' m-auto'
            />
            <LiquidityTokenInput
              amount={amountOtherToken}
              setAmount={setAmountOtherToken}
              tokenSymbol='DXN'
              btnColor='#58BD7D'
              onUpdate={() => {
                setUserUpdatedAmountNXD(false);
              }}
              balance={userDXNBalaneData ? userDXNBalaneData : '0'}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-5 flex-col'>
        <div className='flex flex-col bg-[#f4f5f7] rounded-[16px] p-8 gap-4'>
          <span>Prices and pool share</span>
          <div className='h-[1px] w-full bg-[#EDEFF3]'></div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row justify-between w-full'>
              <span>DXN per NXD</span>
              <span className='font-bold'>
                {formattedNum(1 / nxdPriceInDXN)} NXD
              </span>
            </div>
            <div className='flex flex-col md:flex-row justify-between w-full'>
              <span>NXD per DXN</span>
              <span className='font-bold'>
                {formattedNum(nxdPriceInDXN)} DXN
              </span>
            </div>
            <div className='flex flex-col md:flex-row justify-between w-full'>
              <span>Share of pool</span>
              <span className='font-bold'>
                {userPoolShare > 0 ? userPoolShare.toLocaleString() : '0'}%
              </span>
            </div>
          </div>
        </div>
        <button
          className={`w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 flex items-center justify-center gap-2 ${
            isPending || !connectedUserAddress ? 'opacity-50' : ''
          }`}
          onClick={() => {
            if (isPending || !connectedUserAddress) return;
            needsAllowanceNXD
              ? onApproveClick()
              : needsAllowanceDXN
              ? onApproveClick()
              : onAddLiquidity();
          }}
          disabled={isPending || !connectedUserAddress}
        >
          {isPending && <Spinner />}
          {!connectedUserAddress
            ? 'Wallet not connected'
            : needsAllowanceNXD
            ? 'APPROVE NXD'
            : needsAllowanceDXN
            ? 'APPROVE DXN'
            : 'ADD LIQUIDITY'}
        </button>

        <div className='h-[1px] w-full bg-[#F2F4F5]'></div>
        <div>
          <span className='text-[12px] text-[#90A6B3]'>
            By adding liquidity you’ll earn 0.3% of all trades on this pair
            proportional to your share of the pool. Fees are added to the pool,
            accrue in real time and can be claimed by withdrawing your
            liquidity.
          </span>
        </div>
      </div>
    </div>
  );
};

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

  const { dxnPriceInUSD, nxdPriceInUSD, nxdPriceInDXN } = useNXDPrice();
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

  const nxdFloorPriceInDXN =
    (25000000 / circulatingSupply / circulatingSupply) * 1.003;

  const [amountNXD, setAmountNXD] = useState<string | null>(null);
  const [amountOtherToken, setAmountOtherToken] = useState<string | null>(null);

  const [userUpdatedAmountNXD, setUserUpdatedAmountNXD] =
    useState<boolean>(false);

  useEffect(() => {
    if (!userUpdatedAmountNXD) return;

    const otherTokenAmount = amountNXD
      ? (Number(amountNXD) * nxdPriceInDXN).toString()
      : null;
    setAmountOtherToken(otherTokenAmount);
  }, [amountNXD, nxdPriceInDXN, userUpdatedAmountNXD]);

  useEffect(() => {
    if (userUpdatedAmountNXD) return;

    const nxdAmount = amountOtherToken
      ? (Number(amountOtherToken) / nxdPriceInDXN).toString()
      : null;
    setAmountNXD(nxdAmount);
  }, [amountOtherToken, nxdPriceInDXN, userUpdatedAmountNXD]);

  const {
    data: nxdDXNTotalSupplyData,
    isLoading: isNXDDXNTotalSupplyLoading,
    error,
    refetch: refetchNXDTotalSupply,
  } = useReadContract({
    address: NXD_DXN_UNI_LP_ADDRESS,
    functionName: 'totalSupply',
    args: [],
    abi: NXD_ERC20_ABI,
  });

  const nxdDXNTotalSupply = nxdDXNTotalSupplyData
    ? divideByDecimals(nxdDXNTotalSupplyData.toString(), DXN_DECIMALS)
    : '0';

  const connectedUserAddress = useAccount().address;

  const { data: userLPBalance, isLoading: isUserLPLoading } = useTokenBalance({
    tokenAddress: NXD_DXN_UNI_LP_ADDRESS,
    userAddress: connectedUserAddress,
    decimals: DXN_DECIMALS,
  });

  const userPooledNXD = userLPBalance
    ? (Number(userLPBalance) / Number(nxdDXNTotalSupply)) * Number(nxdReserves)
    : '0';

  const userPoolShare =
    ((Number(userPooledNXD) + Number(amountNXD)) /
      (Number(nxdReserves) + Number(amountNXD))) *
    100;

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex-1 pr-2 lg:pr-4'>
          <div className='p-4 lg:p-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
              NXD/DXN Univ2 LP
            </h2>
            <h2 className='text-1xl font-bold text-gray-800 mb-4'>
              Buy NXD from the NXD/DXN Univ2 Locked LP
            </h2>
            <h2 className='text-xs font-bold text-gray-800'>Trade NXD/DXN</h2>
            <p className='flex-grow text-[#90A6B3] text-xs mt-6'>
              {`Click "Trade NXD" to link the Uniswap link to the NXD/DXN pair`}
            </p>
            <Link
              href={`https://app.uniswap.org/#/swap?inputCurrency=${DXN_ERC20_ADDRESS}&outputCurrency=${NXD_ERC20_ADDRESS}&chain=mainnet`}
              target='_blank'
              rel='noreferrer noopener'
            >
              <button className='w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-6 '>
                TRADE NXD
              </button>
            </Link>
          </div>
        </div>
        <div className='flex-1 lg:pl-4'>
          <div className='p-4 lg:p-8'>
            <div className='flex flex-col lg:flex-row mb-4'>
              <div className='flex-1 '>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>Total TVL LP</p>
                  <p className=' lg:ml-auto font-bold lg:text-right'>
                    {formattedNum(nxdReserves)} NXD /{' '}
                    {formattedNum(dxnReserves)} DXN /{' '}
                    {formattedNum(dxnPriceInUSD * parseInt(dxnReserves) * 2)}{' '}
                    USD
                  </p>
                </div>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>
                    Price Floor NXD/DXN
                  </p>
                  <p className='lg:ml-auto font-bold lg:text-right'>
                    1 NXD = {nxdFloorPriceInDXN.toFixed(8).toLocaleString()} DXN
                    ({formattedNum(nxdFloorPriceInDXN * dxnPriceInUSD)} USD)
                  </p>
                </div>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>
                    NXD Burned from FoT 2%
                  </p>
                  <p className='lg:ml-auto font-bold lg:text-right'>
                    {formattedNum(uiTotalNXDBurned)} NXD (
                    {formattedNum(Number(uiTotalNXDBurned) * nxdPriceInUSD)}{' '}
                    USD)
                  </p>
                </div>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>
                    NXD added to LP from FoT 0.5%
                  </p>
                  <p className='lg:ml-auto font-bold lg:text-right'>
                    {formattedNum(uiTotalNXDAddedToLP)} NXD (
                    {formattedNum(Number(uiTotalNXDAddedToLP) * nxdPriceInUSD)}{' '}
                    USD)
                  </p>
                </div>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>
                    DXN added to LP from FoT 0.5%
                  </p>
                  <p className='lg:ml-auto font-bold lg:text-right'>
                    {formattedNum(uiTotalDXNAddedToLP)} DXN (
                    {formattedNum(Number(uiTotalDXNAddedToLP) * dxnPriceInUSD)}{' '}
                    USD)
                  </p>
                </div>
                <div className='flex flex-col gap-1 lg:gap-0 lg:flex-row mb-4'>
                  <p className='flex-grow text-[#90A6B3]'>
                    DXN Compounded from FoT 1.5%
                  </p>
                  <p className='lg:ml-auto font-bold lg:text-right'>
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
      <AddLiquidity
        amountNXD={amountNXD}
        setAmountNXD={setAmountNXD}
        amountOtherToken={amountOtherToken}
        setAmountOtherToken={setAmountOtherToken}
        setUserUpdatedAmountNXD={setUserUpdatedAmountNXD}
        userPoolShare={userPoolShare}
      />
    </div>
  );
};
export default Univ;
