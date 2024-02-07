import React, { useEffect } from "react";
import { Button } from "@mui/material";
import styles from "./homemodule.module.scss";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";

const HomeModule = () => {
  const router = useRouter();
  const handleStartScanBtn = () => {
    router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN);
  };

  useEffect(() => {
    const handleStartCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (err: any) {
        console.log(err.message || "Failed to access camera.");
      }
    };
    handleStartCamera();
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div id="myid_hi">
        <span>first span</span>
        <span>second span</span>
      </div>
      <div className={styles.headingWrapper}>
        <p>Welcome to</p>
        <p className={styles.scanAndGo}>
          Scan <br /> & <br /> Go
        </p>
      </div>
      <h4>Max 5 products</h4>
      <h4>Max 10,000 Rs</h4>
      <div className={styles.scanningBtnContainer}>
        <Button onClick={() => handleStartScanBtn()} variant="outlined">
          Start scanning
        </Button>
      </div>
    </div>
  );
};

export default HomeModule;
