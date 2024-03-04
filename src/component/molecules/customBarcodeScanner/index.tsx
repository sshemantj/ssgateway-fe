import React, { ForwardedRef, useEffect, useRef } from "react";
import styles from "./CustomQrcodeScanner.module.scss";

import {
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
  Html5Qrcode,
} from "html5-qrcode";

interface ICustomBarCodeScanner {
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

const CustomBarCodeScanner = React.forwardRef<
  ForwardedRef<Html5QrcodeScanner | null>,
  ICustomBarCodeScanner
>((props, ref) => {
  const qrcodeRegionId = "html5qr-code-full-region__barcode";
  const createConfig = (props: ICustomBarCodeScanner) => {
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

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const newRef = ref as React.MutableRefObject<Html5Qrcode | null>;
    if (newRef && newRef.current === null) {
      newRef.current = new Html5Qrcode(qrcodeRegionId, {
        useBarCodeDetectorIfSupported: true,
        verbose: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
    }
    const html5QrcodeScanner = newRef.current;

    setTimeout(() => {
      const container = document.getElementById(qrcodeRegionId);
      if (html5QrcodeScanner && container?.innerHTML == "") {
        html5QrcodeScanner.start(
          { facingMode: window.innerWidth > 768 ? "user" : "environment" },
          config,
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback
        );
      }
    }, 0);

  }, []);

  return <div id={qrcodeRegionId} />;
});

CustomBarCodeScanner.displayName = "CustomBarCodeScanner";

export default CustomBarCodeScanner;
