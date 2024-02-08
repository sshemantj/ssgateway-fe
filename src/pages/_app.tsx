import { Providers } from "@/store/provider";
import "@/styles/globals.css";
// import "@/styles/qrcodeStyle.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
