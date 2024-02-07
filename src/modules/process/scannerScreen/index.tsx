import React, { useState } from "react";
import { Grid, Paper, Button } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, reset } from "@/store/slices/processSlice";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import { Html5QrcodeResult } from "html5-qrcode";

const ScannerScreen = () => {
  const [pauseVideo, setPauseVideo] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("");

  const url = "https://apps.apple.com/in/app/disprz/id1458716803";

  const dispatch = useAppDispatch();
  const router = useRouter();
  const allProducts = useAppSelector((state) => state.process.productList);

  console.log({ allProducts });

  const handleAddProduct = () => {
    router.push(processScreenRoutes.PROCESS_SCANNED_ITEM_SCREEN);
  };

  const resetProductList = () => dispatch(reset());

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    const isItemExist = allProducts.filter((pd) => pd.id === decodedText);
    setCurrentText(decodedText);
    console.log({ decodedText, isItemExist });

    if (!isItemExist.length) {
      dispatch(addProduct({ id: decodedText, name: decodedText }));
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
            pause={pauseVideo}
            showZoomSliderIfSupported={true}
          />
          <Grid item xs={12} style={{ gap: "1rem" }}>
            <Button
              onClick={() => handleAddProduct()}
              sx={{ padding: "0.3rem 2rem", margin: "0 0 1rem 0" }}
              variant="contained"
            >
              ADD Product
            </Button>
            <Button
              onClick={() => resetProductList()}
              sx={{
                padding: "0.4rem",
                fontSize: "0.7rem",
                margin: "0 0 1rem 0",
              }}
              variant="contained"
            >
              Reset Product list
            </Button>
            <h6>pauseVideo : {pauseVideo ? "true" : "false"}</h6>
            <h6>
              {JSON.stringify(
                { pd: allProducts.map((v) => ({ id: v.id })), currentText },
                null,
                2
              )}
            </h6>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ScannerScreen;
