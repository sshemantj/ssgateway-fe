import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/slices/processSlice";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";

const ScannerScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddProduct = () => {
    dispatch(addProduct({ id: "myid", name: "boat air pods" }));
    router.push(processScreenRoutes.PROCESS_SCANNED_ITEM_SCREEN);
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
          <CustomBarcodeScanner />
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddProduct()}
              sx={{ padding: "0.3rem 2rem", margin: "0 0 1rem 0" }}
              variant="contained"
            >
              ADD Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ScannerScreen;
