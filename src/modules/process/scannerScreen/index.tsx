import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import styles from "./scannerScreen.module.scss";
import CustomBarcodeScanner from "@/component/molecules/customBarcodeScanner";

const ScannerScreen = () => {
  return (
    <div className={styles.scannerScreenWrapper}>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} margin={"0 0 1rem 0"}>
            <CustomBarcodeScanner />
          </Grid>
          <Grid item xs={12}>
            <Button
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
