import React from "react";
import { useSearchParams } from "next/navigation";
import { IFileManagementSubRoutes } from "@/constants/allRoutes";
import UploadFile from "./uploadFile";
import VeiwPendingApproval from "./viewPendingAproval";
import styles from "./fileManagement.module.scss";

const FileManagementModule = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.fileManagement_wrapper}>
      {screen === IFileManagementSubRoutes.UPLOAD_FILE ? <UploadFile /> : null}
      {screen === IFileManagementSubRoutes.VIEW_PENDING_APROVAL ? (
        <VeiwPendingApproval />
      ) : null}
    </div>
  );
};

export default FileManagementModule;
