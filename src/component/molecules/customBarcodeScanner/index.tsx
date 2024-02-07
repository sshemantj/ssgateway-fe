import React, { useEffect, useState } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./customBarcode.module.scss";
import { Button } from "@mui/material";
import {
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";

interface ICustomBarcodeScanner {
  fps: number;
  qrbox: number;
  aspectRatio?: string;
  verbose?: boolean;
  disableFlip: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}

const CustomBarcodeScanner = (props: ICustomBarcodeScanner) => {
  const [data, setData] = useState("No Data");
  const [torchOn, setTorchOn] = useState(false);
  const [stream, setStream] = useState(true);
  const [count, setCount] = useState(0);

  const handleOnUpdate = (err: any, result: any) => {
    if (result) {
      setCount((prev) => ++prev);
      setData(result.text);
      setStream(false);
    } else {
      setData("Not Found");
    }
  };

  const qrcodeRegionId = "html5qr-code-full-region";

  // Creates the configuration object for Html5QrcodeScanner.
  const createConfig = (props: ICustomBarcodeScanner) => {
    let config: any = {};
    if (props.fps) {
      config.fps = props.fps;
    }
    if (props.qrbox) {
      config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
      config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
      config.disableFlip = props.disableFlip;
    }
    return config;
  };

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default CustomBarcodeScanner;
