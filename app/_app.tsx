import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className={inter.className}>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
