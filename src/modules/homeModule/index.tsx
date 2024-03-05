import React from "react";
import { ToastContainer } from "react-toastify";

import { Grid } from "@mui/material";
import styles from "./homemodule.module.scss";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div className={styles.headingWrapper}>
          <p>Scan store QR-code to continue</p>
        </div>
      </Grid>
      <div className={styles.qrCodeScanWrapper}></div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomeModule;
