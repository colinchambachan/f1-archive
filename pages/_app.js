import "@/styles/globals.css";
import { Francois_One, Inter, Montserrat } from "next/font/google";
const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />{" "}
    </main>
  );
}
