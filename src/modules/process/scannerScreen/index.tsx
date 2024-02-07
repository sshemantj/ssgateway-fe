import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { Html5QrcodeResult } from "html5-qrcode";
import CustomDrawer from "@/component/molecules/CustomDrawer";

const ScannerScreen = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log({ decodedText });

    if (!currentText) {
      setCurrentText(decodedText);
      setOpen(true);
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
