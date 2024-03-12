import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import LoginComponent from "@/component/molecules/LoginModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <>
        <Component {...pageProps} />
        <LoginComponent />
      </>
    </Providers>
  );
}
