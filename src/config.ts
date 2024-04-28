'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { http, createConfig } from 'wagmi';
import { localhost, mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   ssr: true,
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });

export const config = getDefaultConfig({
  appName: 'NXD Protocol',
  projectId: '06799cb86c8f369de15149ecdbcc2755',
  chains: [
    mainnet,
    // sepolia, localhost
  ],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
