import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
// import WelcomeScreen from "@/component/atoms/welcomeScreen";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import styles from "./homemodule.module.scss";
import GetLocationDetails from "../demoModule/getLocationDetails";
// import useWithinRadius from "@/hooks/useWithinRadius";
import { meterRadiusArr } from "@/constants/locationConstants";
import { decryptString } from "@/utils/encryptDecrypt";

interface IStoreLocation {
  latitude: number | null;
  longitude: number | null;
  name: string | null;
}

const initialLocationValue = {
  latitude: null,
  longitude: null,
  name: null,
};

const HomeModule = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const router = useRouter();
  const [distance, setDistance] = useState<number>(200);
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);

  const onNewScanResult = (result: string) => {
    const decodedObj = getDecodedQrResult(result);
    setStoreLocation(decodedObj);
  };

  const getDecodedQrResult = (encoded: string) => {
    const decryptedData = decryptString(encoded);
    const newLocation = JSON.parse(decryptedData);
    return newLocation;
  };

  useEffect(() => {
    if (isWithinRadius) {
      toast.success(`Store qr-code scan successfull!`);
      // setTimeout(
      //   () => router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN),
      //   1500
      // );
    }
    if (isWithinRadius === false) {
      toast.error(
        `${storeLocation.name} store is not within ${distance}m range!`
      );
    }
  }, [isWithinRadius]);

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

      {/* <div
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
      </div> */}
      <div
        style={{
          marginTop: "2rem",
          wordBreak: "break-all",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2>
          isWithin {`${distance}`} Radius : {`${isWithinRadius}`}
        </h2>
        <h3>
          decrypted value: <br />
          {currentText && decryptString(currentText)}
        </h3>
      </div>
      <GetLocationDetails
        {...{
          storeLocation,
          distanceToCalculate: distance,
          setIsWithinRadius,
        }}
      />
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default HomeModule;
