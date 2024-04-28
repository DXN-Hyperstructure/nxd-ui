import { divideByDecimals } from '@/utils';
import React, { useEffect, useState } from 'react';
import { Address, erc20Abi, zeroAddress } from 'viem';
import { useReadContract } from 'wagmi';

const useTokenBalance = ({
  tokenAddress,
  userAddress,
  decimals,
}: {
  tokenAddress: Address;
  userAddress?: Address;
  decimals?: number;
}) => {
  const [uiBalance, setUiBalance] = useState('0');

  const { data, isLoading, error, refetch } = useReadContract({
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [userAddress || zeroAddress],
    abi: erc20Abi,
  });

  useEffect(() => {
    if (!data || !userAddress) return;
    const balance = data.toString();
    const balanceDividedByDecimals = divideByDecimals(balance, decimals || 18);
    setUiBalance(balanceDividedByDecimals);
  }, [data, decimals, userAddress]);

  return {
    data: uiBalance,
    isLoading,
    error,
    refetch,
  };
};

export default useTokenBalance;
