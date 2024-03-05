import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hideBackNavbar } from "@/store/slices/menu";
import DemoLocation from "@/modules/demoModule/demoLocation";
import GetLocationDetails from "@/modules/demoModule/getLocationDetails";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import { decryptString } from "@/utils/encryptDecrypt";
import { ToastContainer, toast } from "react-toastify";

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

const Demo: NextPage = () => {
  const dispatch = useAppDispatch();
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);
  const [distance, setDistance] = useState<number>(200);

  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);

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
      toast.success(`${storeLocation.name} store qr-code scan successfull!`);
    }
    if (isWithinRadius === false) {
      toast.error(
        `${storeLocation.name} store is not within ${distance}m range!`
      );
    }
  }, [isWithinRadius]);

  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main>
        {/* <DemoLocation /> */}
        <div>
          <CustomQrcodeScanner
            ref={
              ref as React.Ref<React.ForwardedRef<Html5QrcodeScanner | null>>
            }
            fps={10}
            qrbox={250}
            disableFlip={false}
            defaultZoomValueIfSupported={4}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={(error) => console.log(error)}
            showZoomSliderIfSupported={true}
          />
        </div>
        <h2>
          isWithin {`${distance}`} Radius : {`${isWithinRadius}`}
        </h2>
        <GetLocationDetails
          {...{
            storeLocation,
            distanceToCalculate: distance,
            setIsWithinRadius,
            // storeLocation: {
            //   latitude: 19.176755323457076,
            //   longitude: 72.83375854373317,
            // },
          }}
        />
        {/* <div
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
      </div> */}
        {/* <div
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
      </div> */}
        {/* <GetLocationDetails
        {...{
          storeLocation,
          distanceToCalculate: distance,
          setIsWithinRadius,
        }}
      /> */}
      </main>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default Demo;
