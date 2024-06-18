import React from "react";
import { Button } from "@mui/material";
import styles from "./downloadCsv.module.scss";
import useDownloadFile from "@/hooks/downloadFile";

const DownloadFileModule = () => {
  const { loading, downloadFile } = useDownloadFile();

  const handleDownloadCsv = () => {
    downloadFile({
      fileName: "mydownload.csv",
      urlString: "http://localhost:5000/download",
    });
  };
  const handleAproveClick = () => {};
  const handleRejectClick = () => {};

  return (
    <div className={styles.downloadCsvContainer}>
      <h2 className={styles.heading}>File is ready to download</h2>
      <div className={styles.btnGroupWrapper}>
        <Button onClick={() => handleDownloadCsv()} variant="contained">
          Download CSV
        </Button>
        <Button
          onClick={() => handleAproveClick()}
          variant="contained"
          color="success"
        >
          Approve
        </Button>
        <Button
          onClick={() => handleRejectClick()}
          variant="contained"
          color="error"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default DownloadFileModule;
