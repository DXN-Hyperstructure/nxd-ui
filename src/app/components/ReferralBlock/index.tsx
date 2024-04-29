'use client';
import { NXD_PROTOCOL_ABI } from '@/abis/nxdprotocol';
import { useCopyToClipboard } from '@/app/hooks/useCopyToClipboard';
import { NXD_PROTOCOL_ADDRESS } from '@/consts';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import NotificationContent from '../NotificationContent';

const ReferralBlock = () => {
  const connectedUserAddress = useAccount().address;

  const {
    data,
    isLoading,
    refetch: refetchUserReferralCode,
    isRefetching,
  } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'userToReferralCode',
    args: [connectedUserAddress || zeroAddress],
  });

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
      onSettled: () => {
        refetchUserReferralCode();
      },
      onSuccess: () => {
        refetchUserReferralCode();
      },
    },
  });

  useEffect(() => {
    if (writeContractData)
      toast(
        <NotificationContent
          transactionHash={writeContractData}
          // transactionHash='0x41315b70ab0e7b12f0cfcecbd1d8dcaa5533a576d1222fc78540f43742aaabfe'
          action='Create Referral Link'
          onSuccess={() => {
            refetchUserReferralCode();
            console.log('transaction success');
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

  const hasReferralLink =
    connectedUserAddress &&
    data != undefined &&
    data?.toString() != '0' &&
    !isLoading;

  const [userReferralLink, setUserReferralLink] = useState('');

  useEffect(() => {
    setUserReferralLink(`${window.location.origin}?ref=${data?.toString()}`);
  }, [data]);

  const [, copy] = useCopyToClipboard();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(userReferralLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const onCreateReferralLink = () => {
    const randomCode = Math.floor(Math.random() * 10000000000);
    writeContract({
      abi: NXD_PROTOCOL_ABI,
      address: NXD_PROTOCOL_ADDRESS,
      functionName: 'setReferralCode',
      args: [BigInt(randomCode)],
    });
  };

  const { data: startTimeData } = useReadContract({
    abi: NXD_PROTOCOL_ABI,
    address: NXD_PROTOCOL_ADDRESS,
    functionName: 'startTime',
  });

  return (
    <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row'>
      <div className='flex flex-col pr-2 lg:pr-4'>
        <div className='p-4 lg:p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 lg:mb-8'>
            NXD Referral Program
          </h2>
          <h2 className='text-1xl font-bold text-gray-800 '>
            Referral Program
          </h2>
          <div className='flex mt-3 flex-col gap-3'>
            <p className=''>
              The LMP Referral Program will reward NXD Protocol’s early
              participants with a steep referral bonus. We want to keep the
              momentum going and set a precedent for the launch of our future
              projects. This Referral program rewards those who put forth their
              personal time and effort to reach out and engage the community.
            </p>
            <p>
              Each Ethereum address can create their unique referral link
              through the below link. Once the countdown timer on our website
              ends and the Limited Mint Phase has launched, users can use their
              referral link to mint NXD and receive a % bonus on top of their
              DXN amount. The bonus % minted for each referral will be:
            </p>
            <ol className='list-disc list-inside'>
              <li>
                5% to the Referrer from each participant using its Referral Link
              </li>
              <li>
                10% to each Referral using the Referral Link from a Referrer.
              </li>
            </ol>
            {hasReferralLink && (
              <div className='p-4 border flex flex-col rounded-lg'>
                <span className=''>Your Referral Link:</span>
                <div className='flex items-center gap-2'>
                  <span className='text-blue-500'>{userReferralLink}</span>
                  <span onClick={handleCopy}>
                    {copied ? (
                      <Image
                        src='/check-circle.svg'
                        className='cursor-pointer'
                        width={15}
                        height={15}
                        alt='Check Circle'
                      />
                    ) : (
                      <Image
                        src='/copy.svg'
                        className='cursor-pointer'
                        width={15}
                        height={15}
                        alt='Copy'
                      />
                    )}
                  </span>
                </div>
              </div>
            )}
            {!hasReferralLink && (
              <button
                className={`w-full lg:w-full rounded-[8px] bg-[#000307] text-white px-9 py-4 mt-2 ${
                  connectedUserAddress && !isPending ? ' hover:opacity-90' : ''
                } flex items-center gap-2 justify-center`}
                disabled={!startTimeData || !connectedUserAddress || isPending}
                onClick={() => {
                  if (connectedUserAddress && !isPending) {
                    onCreateReferralLink();
                  }
                }}
              >
                {isPending ? <Spinner /> : <></>}
                {connectedUserAddress &&
                  !isLoading &&
                  (data?.toString() == '0' || data == undefined) &&
                  'Create Your Referral Link'}
                {!connectedUserAddress && 'Wallet Not Connected'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralBlock;
