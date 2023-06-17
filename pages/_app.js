import "@/styles/globals.css";
import { Francois_One, Inter, Montserrat } from "next/font/google";
import Head from "next/head";

const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      {/* <main> */}
      <Head>
        <title>F1 Archive</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
