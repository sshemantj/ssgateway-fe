import React, { useState } from "react";
import { Grid, Paper, Button } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/slices/processSlice";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import { Html5QrcodeResult } from "html5-qrcode";

const ScannerScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [decodedResults, setDecodedResults] = useState<Html5QrcodeResult[]>([]);

  console.log({ decodedResults });

  const handleAddProduct = () => {
    dispatch(addProduct({ id: "myid", name: "boat air pods" }));
    router.push(processScreenRoutes.PROCESS_SCANNED_ITEM_SCREEN);
  };

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
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
          />
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddProduct()}
              sx={{ padding: "0.3rem 2rem", margin: "0 0 1rem 0" }}
              variant="contained"
            >
              ADD Product
            </Button>
          </Grid>
          <h3>{JSON.stringify(decodedResults, null, 2)}</h3>
        </Grid>
      </Paper>
    </div>
  );
};

export default ScannerScreen;
