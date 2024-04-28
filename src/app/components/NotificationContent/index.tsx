'use client';
import React, { useEffect } from 'react';
import Spinner from '../Spinner';
import Link from 'next/link';
import { useWaitForTransactionReceipt } from 'wagmi';
import { Hash } from 'viem';

const NotificationContent = ({
  transactionHash,
  action,
  onSuccess,
}: {
  transactionHash?: Hash;
  action:
    | 'Mint'
    | 'Approve'
    | 'Deposit'
    | 'Stake NXD'
    | 'Unstake'
    | 'Unstake With Penalty'
    | 'Claim'
    | 'Create Referral Link';
  onSuccess?: () => void;
}) => {
  const waitForTxResult = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const isSuccess = waitForTxResult?.status === 'success';
  const isFailure = waitForTxResult?.status === 'error';
  const isPending = waitForTxResult?.status === 'pending';

  useEffect(() => {
    onSuccess?.();
  }, [isSuccess]);

  return (
    <div
      className={`flex flex-col text-black gap-2`}
      style={{
        fontFamily: '__Inria_Sans_ebc75b, __Inria_Sans_Fallback_ebc75b',
      }}
    >
      <div className='flex items-center gap-2'>
        {isPending && <Spinner border='black' />}
        {isSuccess && <img src='/check-circle.svg' className='w-6 h-6' />}
        {isFailure && <img src='/x-circle.svg' className='w-6 h-6' />}
        <span>
          {action} transaction{' '}
          {isPending ? 'pending...' : isSuccess ? 'successful' : 'failed'}
        </span>
      </div>
      <Link
        href={`https://etherscan.io/tx/${transactionHash}`}
        className='px-2 flex items-center gap-1 text-blue-500 underline'
        target='_blank'
        rel='noreferrer noopener'
      >
        <span className=''>View on Etherscan</span>
        <img src='/external-link.svg' className='w-4 h-4' />
      </Link>
    </div>
  );
};

export default NotificationContent;
