import { Providers } from "@/store/provider";
import "@/styles/globals.css";
// import "@/styles/barCodeStyle.scss";
// import "@/styles/qrcode.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
