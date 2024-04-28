import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from 'react';
import ConnectWallet from './ConnectWallet';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='drop-shadow-md h-full lg:px-28 lg:py-11  min-w-screen lg:bg-[#F7F9FA] '>
      <div className='flex w-full items-center justify-between  lg:bg-[#F7F9FA] px-8 lg:px-0 py-[13.5px] lg:py-0 bg-black '>
        <div className='flex items-center lg:max-w-[70%] lg:gap-4 justify-between '>
          <Image
            src={'/logo.png'}
            alt='logo'
            width={72}
            height={72}
            className='hidden lg:block'
          />
          <Image
            src={'/white-logo.png'}
            alt='logo'
            width={48}
            height={48}
            className='lg:hidden'
          />
          <span className='hidden lg:block text-[#90A6B3] max-w-[500px] text-base'>
            The NXD cryptocurrency is a deflationary asset aiming to function as
            a store-of-value within the DXN hyper-structure system dynamics.
          </span>
          <Link
            className='lg:border-[2px] lg:border-[#90A6B3] lg:py-[10px] lg:px-[32px] lg:rounded lg:ml-0 ml-[55px] hover:opacity-80'
            href=' https://nxd-protocol-docs.gitbook.io/nxd-protocol-dxn-hyperstructure-initiative'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Image
              src={'/scroll-icon.png'}
              alt='scroll'
              width={19}
              height={19}
              className='hidden lg:block min-h-[19px] min-w-[19px]'
            />
          </Link>
          <Link
            className='lg:border-[2px] lg:border-[#90A6B3] lg:py-[10px] lg:px-[32px] lg:rounded hover:opacity-80'
            href='https://github.com/TheArcadiaGroup/publications/blob/main/audits/NXDFinal.pdf'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Image
              src={'/stamp-icon.png'}
              alt='stamp'
              width={19}
              height={19}
              className='hidden lg:block min-h-[19px] min-w-[19px]'
            />
          </Link>
        </div>
        <div className='flex items-center gap-8'>
          <Link
            className='flex flex-col items-center gap-[3px] lg:hidden text-[12px] '
            href=' https://nxd-protocol-docs.gitbook.io/nxd-protocol-dxn-hyperstructure-initiative'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Image
              src={'/white-paper-white.png'}
              alt='scroll-white'
              width={24}
              height={24}
            />
            <span className='text-[#90A6B3]'>WHITEPAPER</span>
          </Link>
          <Link
            className='flex flex-col items-center gap-[3px] lg:hidden text-[12px] '
            href='https://github.com/TheArcadiaGroup/publications/blob/main/audits/NXDFinal.pdf'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Image
              src={'/audit-white-icon.png'}
              alt='stamp'
              width={24}
              height={24}
              className='block lg:hidden'
            />
            <span className='text-[#90A6B3]'>AUDIT</span>
          </Link>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Header;
/* Navigation */

// position: absolute;
// width: 1440px;
// height: 84px;
// left: 0px;
// top: 39px;

// filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
