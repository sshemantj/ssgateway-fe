import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import { ForwardedRef, Ref, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { useAppDispatch } from "@/store/hooks";
import { showBackNavbar } from "@/store/slices/menu";

const Demo: NextPage = () => {
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showBackNavbar());
  }, []);
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

export default Demo;
