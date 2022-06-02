import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { WithSWR } from '../src/hoc/withSWR';
import DashboardProvider from '../src/dashboard/provider/context';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Salvia-kit Dashboard v5 Next.js</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <ThemeProvider attribute="class">
        <WithSWR>
          <DashboardProvider>
            <Component {...pageProps} />
          </DashboardProvider>
        </WithSWR>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
