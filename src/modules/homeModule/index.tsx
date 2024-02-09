import React, { ForwardedRef, Ref, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import styles from "./homemodule.module.scss";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";

const HomeModule = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    if (!currentText) {
      setCurrentText(decodedText);
      setOpen(true);
      ref.current?.pause(true);
      toast.success("Store qr-code scan complete! " + decodedResult);
      setTimeout(
        () => router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN),
        1500
      );
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.headingWrapper}>
        <p>
          Scan store QR-code <br /> to continue
        </p>
        <CustomQrcodeScanner
          ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
          fps={10}
          qrbox={250}
          disableFlip={false}
          defaultZoomValueIfSupported={4}
          qrCodeSuccessCallback={onNewScanResult}
          qrCodeErrorCallback={(error) => console.log(error)}
          showZoomSliderIfSupported={true}
        />
      </div>
      <WelcomeScreen />
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomeModule;
