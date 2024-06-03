import React from "react";
import styles from "./uploading.module.scss";
import Image from "next/image";
import closeIcon from "@/images/closeIcon.svg";
import CircularProgressWithLabel from "@/component/atoms/circularProgress";

interface IProps {
  progress: number;
  file: File | undefined;
}
const Uploading = (props: IProps) => {
  const { progress, file } = props;
  return (
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
  );
};

export default Uploading;
