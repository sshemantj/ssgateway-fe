import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import { Grid, Paper } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import CustomDrawer from "@/component/molecules/CustomDrawer";

const ScannerScreen = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!open && ref && ref.current) {
      // ref.current?.resume();
    }
  }, [open]);

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log({ decodedText });

    if (!currentText) {
      setCurrentText(decodedText);
      setOpen(true);
      ref.current?.pause();
    }
  };

  return (
    <div className={styles.scannerScreenWrapper}>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CustomBarcodeScanner
            ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={(error) => console.log(error)}
            showZoomSliderIfSupported={true}
          />
          <CustomDrawer
            {...{ open, setOpen, data: currentText, setCurrentText }}
          />
        </Grid>
      </Paper>
    </div>
  );
};

export default ScannerScreen;
