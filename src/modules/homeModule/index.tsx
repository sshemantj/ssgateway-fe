import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
// import WelcomeScreen from "@/component/atoms/welcomeScreen";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import GetLocationDetails from "../demoModule/getLocationDetails";
// import useWithinRadius from "@/hooks/useWithinRadius";
import { meterRadiusArr } from "@/constants/locationConstants";
import { decryptString } from "@/utils/encryptDecrypt";
import useWithinRadius from "@/hooks/useWithinRadius";
import styles from "./homemodule.module.scss";

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

let TIMEOUT: NodeJS.Timeout;

const HomeModule = () => {
  const ref = useRef<Html5QrcodeScanner | null>(null);
  // const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const router = useRouter();
  const [distance, setDistance] = useState<number>(200);
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);
  const { isWithinRadius, setIsWithinRadius, setStoreDetailsSetup } =
    useWithinRadius();

  useEffect(() => {
    setStoreDetailsSetup({
      distanceToCalculate: distance,
      storeLocation: storeLocation,
    });
  }, [storeLocation]);

  const onNewScanResult = (result: string) => {
    const newLocation = JSON.parse(result);
    setStoreLocation(newLocation);
    // const decodedObj = getDecodedQrResult(result);
    // setStoreLocation(decodedObj);
  };

  const getDecodedQrResult = (encoded: string) => {
    const decryptedData = decryptString(encoded);
    const newLocation = JSON.parse(decryptedData);
    return newLocation;
  };

  useEffect(() => {
    if (isWithinRadius) {
      toast.success(`Store qr-code scan successfull!`);
      setTimeout(
        () => router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN),
        1500
      );
    }
    if (isWithinRadius === false) {
      toast.error(`Store is not within ${distance}m range!`);
    }

    if (TIMEOUT) clearTimeout(TIMEOUT);

    TIMEOUT = setTimeout(() => {
      setIsWithinRadius(null);
    }, 3000);
  }, [isWithinRadius]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = +event.target.value;
    setIsWithinRadius(null);
    setDistance(value);
  };

  useEffect(() => {
    const handleStartCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (err: any) {
        console.log(err.message || "Failed to access camera.");
      }
    };
    handleStartCamera();
  }, []);

  return (
    <div className={styles.homeWrapper}>
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
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ width: "12rem" }}
          id="outlined-select-currency"
          select
          label="Select"
          // helperText="select your dinstance in meters"
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
      <div
        style={{
          padding: "0 1rem",
          marginTop: "2rem",
          wordBreak: "break-all",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2>
          isWithin {`${distance}`} Radius : {`${isWithinRadius}`}
        </h2>
        <h3>
          decrypted value: <br />
          {JSON.stringify(storeLocation, null, 2)}
        </h3>
      </div>
      {/* <GetLocationDetails
        {...{
          storeLocation,
          distanceToCalculate: distance,
          setIsWithinRadius,
        }}
      /> */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomeModule;
