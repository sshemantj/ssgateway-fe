import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "@/images/closeIcon.svg";
import CircularProgressWithLabel from "@/component/atoms/circularProgress";
import SuccessAtom from "@/component/atoms/successAtom";
import DragDrop from "@/component/atoms/dragAndDrop";
import styles from "./uploadFile.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { uploadDataforPendingApproval } from "@/services/thunks/tableApis";
import { ToastContainer, toast } from "react-toastify";

type IStatuses = "selecting" | "selected" | "uploading" | "complete";

const UploadFileModule = () => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<IStatuses>("selecting");

  const dispatch = useAppDispatch();

  const handleUploadFile = () => {
    if (file) {
      setUploadStatus("uploading");
      dispatch(uploadDataforPendingApproval(file)).then(() => {
        toast.success("File successfully uploaded!");
      });
    } else {
      toast.warn("select file first!");
    }
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) => {
    //     if (prevProgress >= 100) {
    //       clearInterval(timer);
    //       setUploadStatus("complete");
    //       return 100;
    //     } else {
    //       return prevProgress + 10;
    //     }
    //   });
    // }, 800);
  };

  const handleChange = (file: File) => {
    setUploadStatus("selected");
    setFile(file);
  };

  console.log(file);

  return (
    <div className={styles.uploadFileWrapper}>
      <div className={styles["formbold-main-wrapper"]}>
        <div className={styles["formbold-form-wrapper"]}>
          <form>
            {uploadStatus === "selecting" && (
              <div className={styles.dropFileWrapper}>
                <div
                  className={`${styles["formbold-mb-5"]} ${styles["formbold-file-input"]}`}
                >
                  <label>
                    <DragDrop {...{ handleChange }}>
                      <div>
                        <span className={styles["formbold-drop-file"]}>
                          Drop files here
                        </span>
                        <span className={styles["formbold-or"]}> Or </span>
                        <span className={styles["formbold-browse"]}>
                          Browse
                        </span>
                      </div>
                    </DragDrop>
                  </label>
                </div>
              </div>
            )}
            {uploadStatus === "selected" && (
              <>
                <div className={styles.fileNameContainer}>
                  <div
                    className={`${styles["formbold-file-list"]} ${styles["formbold-mb-5"]}`}
                  >
                    <div className={`${styles["formbold-file-item"]}`}>
                      <span className={styles["formbold-file-name"]}>
                        {file?.name || ""}
                      </span>
                      <button>
                        <Image src={closeIcon} alt="" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                  <CircularProgressWithLabel value={progress} />
                </div>
              </>
            )}
            {uploadStatus === "uploading" && (
              <>
                <div className={styles.fileNameContainer}>
                  <div
                    className={`${styles["formbold-file-list"]} ${styles["formbold-mb-5"]}`}
                  >
                    <div className={`${styles["formbold-file-item"]}`}>
                      <span className={styles["formbold-file-name"]}>
                        banner-design.png
                      </span>
                      <button>
                        <Image src={closeIcon} alt="" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                  <CircularProgressWithLabel value={progress} />
                </div>
              </>
            )}
          </form>
          {uploadStatus === "complete" ? (
            <>
              <SuccessAtom />
              <h3>File upload success!</h3>
            </>
          ) : (
            <div className={styles.btnWrapper}>
              <button
                onClick={() => handleUploadFile()}
                disabled={uploadStatus === "uploading"}
                className={`${styles["formbold-btn"]} ${styles["w-full"]}`}
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadFileModule;
