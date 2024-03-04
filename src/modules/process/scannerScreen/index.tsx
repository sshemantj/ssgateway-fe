import React, { ForwardedRef, Ref, useRef, useState } from "react";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import CustomDrawer from "@/component/molecules/CustomDrawer";
import styles from "./scannerScreen.module.scss";

const ScannerScreen = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<Html5QrcodeScanner | null>(null);

  const onNewScanResult = (
    decodedText: string,
  ) => {
    if (!currentText) {
      setCurrentText(decodedText);
      setOpen(true);
      ref.current?.pause(true);
    }
  };

  return (
    <div className={styles.scannerScreenWrapper}>
      <CustomBarcodeScanner
        ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
        fps={10}
        qrbox={250}
        disableFlip={false}
        defaultZoomValueIfSupported={4}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeErrorCallback={(error) => console.log(error)}
        showZoomSliderIfSupported={true}
      />
      <CustomDrawer
        {...{
          open,
          setOpen,
          data: currentText,
          setCurrentText,
          camRef: ref,
        }}
      />
    </div>
  );
};

export default ScannerScreen;
