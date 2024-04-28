import type { Metadata } from 'next';
import { Inria_Sans } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const inter = Inria_Sans({
  weight: ['400', '300', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NXD Protocol',
  description:
    'NXD Protocol empowers the economics of DXN Protocol by introducing the NXD token. Fair minted, immutable and open source.',
  twitter: {
    card: 'summary_large_image',
  },

  openGraph: {
    type: 'website',
    description:
      'NXD Protocol empowers the economics of DXN Protocol by introducing the NXD token. Fair minted, immutable and open source.',
    title: 'NXD Protocol',
    locale: 'en_US',
    url: 'https://dxn-hyperstructure.com/',
    siteName: 'NXD Protocol',
    images: [
      {
        url: 'https://dxn-hyperstructure.com/og-image.png',
        alt: 'NXD Protocol',
      },
    ],
  },
};
const scriptTxt = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')

  base.href = ipfsMatch ? ipfsMatch?.[0] : '/'
  document.head.append(base)
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTxt }} />
      </head>
      <body className={inter.className}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
