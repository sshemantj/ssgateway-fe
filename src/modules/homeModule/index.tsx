import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import { Grid, Paper } from "@mui/material";
import styles from "./homemodule.module.scss";
import useWithinRadius from "@/hooks/useWithinRadius";

const HomeModule = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();
  const { isWithinRadius, setStoreDetailsSetup } = useWithinRadius();

  useEffect(() => {
    alert(`isWithinRadius = ${isWithinRadius}`);
    if (isWithinRadius) {
      toast.success("Store qr-code scan complete!");
      alert(`isWithinRadius = ${isWithinRadius}`);
    }
  }, [isWithinRadius]);

  const handleStoreQrcodeScan = (data: string) => {
    try {
      const newLocation = JSON.parse(data);
      if (newLocation.latitude && newLocation.longitude) {
        alert(newLocation.name);
        alert(newLocation.latitude);
        alert(newLocation.longitude);
        setStoreDetailsSetup({
          storeLocation: newLocation,
          distanceToCalculate: 100,
        });
      } else {
        alert("Scan store Qr-code to get location!");
      }
    } catch (error: any) {
      alert(error.message);
    }
    // toast.success("Store qr-code scan complete!");
    // setTimeout(
    //   () => router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN),
    //   1500
    // );
  };

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    if (!currentText) {
      setCurrentText(decodedText);
      setOpen(true);
      ref.current?.pause(true);
      handleStoreQrcodeScan(decodedText);
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div className={styles.headingWrapper}>
            <p>Scan store QR-code to continue</p>
          </div>
        </Grid>
      </Paper>
      <div className={styles.qrCodeScanWrapper}>
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
      {/* <WelcomeScreen /> */}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomeModule;
