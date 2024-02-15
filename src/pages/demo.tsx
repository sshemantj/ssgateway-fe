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

interface IStoreLocation {
  latitude: number | null;
  longitude: number | null;
}

const initialLocationValue = {
  latitude: null,
  longitude: null,
};

const Demo: NextPage = () => {
  const dispatch = useAppDispatch();
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);

  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);

  const onNewScanResult = (result: string) => {
    const decodedObj = getDecodedQrResult(result);
    setStoreLocation(decodedObj);
    // if (!currentText) {
    // ref.current?.pause(true);
    // handleStoreQrcodeScan(decodedText);
    // }
  };

  const getDecodedQrResult = (encoded: string) => {
    const decryptedData = decryptString(encoded);
    const newLocation = JSON.parse(decryptedData);
    return newLocation;
  };

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
        <h2>isWithinRadius : {`${isWithinRadius}`}</h2>
        <GetLocationDetails
          {...{
            storeLocation,
            distanceToCalculate: 200,
            setIsWithinRadius,
            // storeLocation: {
            //   latitude: 19.176755323457076,
            //   longitude: 72.83375854373317,
            // },
          }}
        />
      </main>
    </>
  );
};

export default Demo;
