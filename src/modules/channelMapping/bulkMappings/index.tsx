import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import SuccessAtom from "@/component/atoms/successAtom";
import Selecting from "./selecting";
import Selected from "./selected";
import Uploading from "./uploading";
import styles from "./bulkChannelMappings.module.scss";

type IStatuses = "selecting" | "selected" | "uploading" | "complete";

const BulkChannelMappings = () => {
  const [uploadStatus, setUploadStatus] = useState<IStatuses>("selecting");
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);

  const handleChange = (file: File) => {
    setFile(file);
    setUploadStatus("selected");
  };

  const handleUploadFile = () => {
    if (file) {
      setUploadStatus("uploading");
      //   dispatch(bulkUploadChannelMappings(file)).then(() => {
      //     toast.success("File successfully uploaded!");
      setProgress(100);
      setUploadStatus("complete");
      //   });
    } else {
      toast.error("select file first!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className={styles.bulkMappingsWrapper}>
      <Box className={styles.bulkMappings_inner}>
        <div className={styles["formbold-main-wrapper"]}>
          <div className={styles["formbold-form-wrapper"]}>
            <form>
              {uploadStatus === "selecting" && (
                <Selecting handleChange={handleChange} />
              )}
              {uploadStatus === "selected" && (
                <Selected {...{ file, progress }} />
              )}
              {uploadStatus === "uploading" && (
                <Uploading {...{ file, progress }} />
              )}
            </form>
            {uploadStatus === "complete" && (
              <>
                <SuccessAtom />
                <h3>File upload success!</h3>
              </>
            )}
            {uploadStatus !== "complete" && (
              <div className={styles.btnWrapper}>
                {uploadStatus === "selected" || (
                  <Button style={{ margin: "0 0 1rem 0" }}>
                    <a
                      download="UploadDataforPendingAprroval.csv"
                      href="/UploadDataforPendingAprroval.csv"
                    >
                      Download template
                    </a>
                  </Button>
                )}
                <button
                  onClick={() => handleUploadFile()}
                  disabled={!file || uploadStatus === "uploading"}
                  className={`${styles["formbold-btn"]} ${styles["w-full"]}`}
                >
                  Upload File
                </button>
              </div>
            )}
          </div>
        </div>
        <Toaster />
      </Box>
    </div>
  );
};

export default BulkChannelMappings;
