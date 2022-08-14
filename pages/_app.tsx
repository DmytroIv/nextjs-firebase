import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '@styles/globals.css';
import { UserProvider } from '@context';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Next.js + Firebase</title>
        <meta name="description" content="Next.js + Firebase" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Component {...pageProps} />
        <Toaster />
      </UserProvider>
    </>
  );
}

export default MyApp;
