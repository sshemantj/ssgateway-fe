import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import { ForwardedRef, Ref, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";

const Home: NextPage = () => {
  const ref = useRef<Html5QrcodeScanner | null>(null);

  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
        }}
      >
        <CustomBarcodeScanner
          ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
          fps={10}
          qrbox={250}
          disableFlip={false}
          defaultZoomValueIfSupported={4}
          qrCodeSuccessCallback={() => {}}
          qrCodeErrorCallback={(error) => console.log(error)}
          showZoomSliderIfSupported={true}
        />
      </main>
    </>
  );
};

export default Home;
