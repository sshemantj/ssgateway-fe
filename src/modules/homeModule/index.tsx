import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import styles from "./homemodule.module.scss";
import useWithinRadius from "@/hooks/useWithinRadius";
import { meterRadiusArr } from "@/constants/locationConstants";

const HomeModule = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();
  const [distance, setDistance] = useState<number>(100);
  const { isWithinRadius, setStoreDetailsSetup } = useWithinRadius();

  useEffect(() => {
    if (isWithinRadius) {
      alert(`isWithinRadius = ${isWithinRadius}`);
      toast.success("Store qr-code scan complete!");
      console.warn(`it ran`);
      // setTimeout(
      //   () => router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN),
      //   1500
      // );
    } else if (isWithinRadius === false) {
      toast.warn(`Store is not within ${distance}m distance!`);
      ref.current?.resume();
    }
  }, [isWithinRadius, distance]);

  const handleStoreQrcodeScan = (data: string) => {
    try {
      alert(data);
      const newLocation = JSON.parse(data);
      if (newLocation.latitude && newLocation.longitude) {
        setStoreDetailsSetup({
          storeLocation: newLocation,
          distanceToCalculate: distance,
        });
      } else {
        alert("Scan store Qr-code to get location!");
      }
    } catch (error: any) {
      alert(`Error ${error.message}`);
    }
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = +event.target.value;
    setDistance(value);
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
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          helperText="select your dinstance in meters"
          value={distance}
          onChange={(e) => handleChange(e)}
        >
          {meterRadiusArr.map(({ name, value }, index) => (
            <MenuItem key={index} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* <WelcomeScreen /> */}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomeModule;
