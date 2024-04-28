import React from 'react';
import Image from 'next/image';
import {
  NXD_ERC20_ADDRESS,
  NXD_PROTOCOL_ADDRESS,
  NXD_STAKING_VAULT_ADDRESS,
} from '@/consts';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='footer bg-black relative'>
      <div className='absolute inset-0 bottom-0 flex items-center justify-end flex-col mb-5 md:hidden'>
        <div className='shadow-lg opacity-15'>
          <Image
            src={'/white-logo.png'}
            alt='white-logo'
            layout='fixed'
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className='text-[#90A6B3] flex flex-col md:flex-row items-center justify-between px-4 lg:px-20 py-8 md:py-12'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-20 md:mr-auto'>
          <div className='hidden md:block'>
            <Image
              src={'/white-logo.png'}
              alt='white-logo'
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className='text-center md:text-left w-full md:w-auto'>
          <span className='text-[#90A6B3]'>Join our official socials</span>
          <div className='flex items-center justify-center md:justify-start mt-2'>
            <div className='flex items-center gap-4'>
              <a
                href='https://medium.com/@DXN_Hyperstructure'
                className='mr-4'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image
                  src={'/medium-logo.svg'}
                  alt='telegram'
                  width={32}
                  height={32}
                />
              </a>
              <a
                href='https://t.me/NXD_Protocol/'
                className='mr-4'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image
                  src={'/logo-telegram.png'}
                  alt='telegram'
                  width={32}
                  height={32}
                />
              </a>
              <a
                href=' https://twitter.com/NXD_Protocol/'
                className='mr-4'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image
                  src={'/logo-twitter.png'}
                  alt='Twitter'
                  width={32}
                  height={32}
                />
              </a>
              <a
                href='https://github.com/DXNhyperstructure/NXD-Protocol'
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image
                  src={'/logo-github.png'}
                  alt='GitHub'
                  width={32}
                  height={32}
                />
              </a>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-20 md:mx-auto'>
          <div className='text-[#90A6B3] gap-4'>
            <div className='text-[#90A6B3] mb-4'>
              <div className='text-[#90A6B3] mb-4 flex flex-col md:flex-row items-center'>
                <div className='md:mr-2'>
                  <p className='text-white opacity-80'>NXD Token:</p>
                </div>
                <div className='md:flex items-center'>
                  <div className='flex items-center'>
                    <p className='text-[#4097FF] mr-2 md:inline-block'>
                      {NXD_ERC20_ADDRESS}
                    </p>
                    <Link
                      href={`https://etherscan.io/address/${NXD_ERC20_ADDRESS}`}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <img src='/external-link-white.svg' className='w-6 h-6' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-[#90A6B3] mb-4'>
              <div className='text-[#90A6B3] mb-4 flex flex-col md:flex-row items-center'>
                <div className='md:mr-2'>
                  <p className='text-white opacity-80'>NXD(Vault):</p>
                </div>
                <div className='md:flex items-center'>
                  <div className='flex items-center'>
                    <p className='text-[#4097FF] mr-2 md:inline-block'>
                      {NXD_STAKING_VAULT_ADDRESS}
                    </p>
                    <Link
                      href={`https://etherscan.io/address/${NXD_STAKING_VAULT_ADDRESS}`}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <img src='/external-link-white.svg' className='w-6 h-6' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-[#90A6B3] mb-4'>
              <div className='text-[#90A6B3] mb-4 flex flex-col md:flex-row items-center'>
                <div className='md:mr-2'>
                  <p className='text-white opacity-80'>NXD Buy and Burn:</p>
                </div>
                <div className='md:flex items-center'>
                  <div className='flex items-center'>
                    <p className='text-[#4097FF] mr-2 md:inline-block'>
                      {NXD_PROTOCOL_ADDRESS}
                    </p>
                    <Link
                      href={`https://etherscan.io/address/${NXD_PROTOCOL_ADDRESS}`}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <img src='/external-link-white.svg' className='w-6 h-6' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
