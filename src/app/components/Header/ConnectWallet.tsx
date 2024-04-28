'use client';
import { formatAddressForDisplay } from '@/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from 'react';

const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <button
            className='lg:border-[2px] lg:border-[#90A6B3] lg:py-[10px] lg:px-[32px] lg:rounded'
            onClick={() => {
              if (!connected) openConnectModal();
            }}
          >
            {connected ? (
              <div className='flex gap-2 hover:opacity-80'>
                {/* <span
                  onClick={() => {
                    openChainModal();
                  }}
                >
                  {chain?.name}
                </span> */}
                <span
                  onClick={() => {
                    connected ? openAccountModal() : openConnectModal();
                  }}
                >
                  {formatAddressForDisplay(account.address, 5, 4)}
                </span>
              </div>
            ) : (
              <>
                <Image
                  src={'/wallet-icon.png'}
                  alt='wallet'
                  width={19}
                  height={19}
                  className='hidden lg:block min-h-[19px] min-w-[19px]'
                />
                <div className='flex flex-col items-center gap-[3px] lg:hidden text-[12px] '>
                  <Image
                    src={'/wallet-white-icon.png'}
                    alt='wallet'
                    width={24}
                    height={24}
                    className='block lg:hidden'
                  />
                  <span className='text-[#90A6B3]'>WALLET</span>
                </div>
              </>
            )}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
