import React, { ForwardedRef, useEffect, useRef } from "react";
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
  defaultZoomValueIfSupported?: number;
  disableFlip: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}

const CustomBarcodeScanner = React.forwardRef<
  ForwardedRef<Html5QrcodeScanner | null>,
  ICustomBarcodeScanner
>((props, ref) => {
  const qrcodeRegionId = "html5qr-code-full-region";

  const createConfig = (props: ICustomBarcodeScanner) => {
    const config: any = {};
    const {
      fps,
      qrbox,
      aspectRatio,
      disableFlip,
      showZoomSliderIfSupported,
      defaultZoomValueIfSupported,
    } = props;

    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;
    if (showZoomSliderIfSupported !== undefined)
      config.showZoomSliderIfSupported = showZoomSliderIfSupported;
    config.videoConstraints = {
      facingMode: { exact: window.innerWidth > 768 ? "user" : "environment" },
    };
    if (defaultZoomValueIfSupported !== undefined)
      config.defaultZoomValueIfSupported = defaultZoomValueIfSupported;
    return config;
  };

  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const newRef = ref as React.MutableRefObject<Html5QrcodeScanner | null>;
    if (newRef && newRef.current === null) {
      newRef.current = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    }
    const html5QrcodeScanner = newRef.current;

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
        html5QrcodeScanner.clear().catch((error: any) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, []);

  return <div id={qrcodeRegionId} />;
});

CustomBarcodeScanner.displayName = "CustomBarcodeScanner";

export default CustomBarcodeScanner;
