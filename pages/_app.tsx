import { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Next.js + Firebase</title>
        <meta name="description" content="Next.js + Firebase" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
