import React from "react";
import { Button } from "@mui/material";
import styles from "./homemodule.module.scss";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.headingWrapper}>
        <p>Welcome to</p>
        <p className={styles.scanAndGo}>
          Scan <br /> & <br /> Go
        </p>
      </div>
      <h4>Max 5 products</h4>
      <h4>Max 10,000 Rs</h4>
      <div className={styles.scanningBtnContainer}>
        <Button variant="outlined">Start scanning</Button>
      </div>
    </div>
  );
};

export default HomeModule;
