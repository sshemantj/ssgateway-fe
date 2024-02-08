import React, { useEffect, useRef } from "react";
import styles from "./customBarcode.module.scss";
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
  pause?: boolean;
  showZoomSliderIfSupported?: boolean;
  disableFlip: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}

const CustomBarcodeScanner = (props: ICustomBarcodeScanner) => {
  const qrcodeRegionId = "html5qr-code-full-region";
  const ref = useRef<Html5QrcodeScanner | null>(null);

  const createConfig = (props: ICustomBarcodeScanner) => {
    const config: any = {};
    const { fps, qrbox, aspectRatio, disableFlip, showZoomSliderIfSupported } =
      props;

    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;
    if (showZoomSliderIfSupported !== undefined)
      config.showZoomSliderIfSupported = showZoomSliderIfSupported;
    config.videoConstraints = {
      facingMode: { exact: window.innerWidth > 768 ? "user" : "environment" },
    };
    return config;
  };

  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    if (ref.current === null) {
      ref.current = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    }
    const html5QrcodeScanner = ref.current;

    setTimeout(() => {
      const container = document.getElementById(qrcodeRegionId);
      if (html5QrcodeScanner && container?.innerHTML == "") {
        html5QrcodeScanner.render(
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback
        );
      }
    }, 0);

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default CustomBarcodeScanner;
