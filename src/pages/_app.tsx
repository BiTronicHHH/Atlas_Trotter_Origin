import '@/styles/globals.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import React from 'react';
import Wrapper from '../components/ui/Wrapper';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Atlas Trotter"
        description="Your ultimate travel companion."
      />
      <Head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      <Script
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        strategy="afterInteractive"
        data-gyg-partner-id="88G9VCW"
      />
    </>
  );
}

export default MyApp;
