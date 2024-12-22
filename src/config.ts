'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { http, fallback, unstable_connector } from 'wagmi';
import { localhost, mainnet } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { injected } from 'wagmi/connectors';

export const config = getDefaultConfig({
  appName: 'NXD Protocol',
  projectId: '06799cb86c8f369de15149ecdbcc2755',
  chains: [
    mainnet,
    // sepolia,
    localhost,
  ],

  transports: {
    [mainnet.id]: fallback([unstable_connector(injected), http()]),
    [localhost.id]: http(),
  },

  ssr: true, // If your dApp uses server side rendering (SSR)
});
