import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./fileManagement.module.scss";
import { IFileManagementSubRoutes } from "@/constants/allRoutes";
import UploadFile from "./uploadFile";

const FileManagementModule = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.profileWrapper}>
      {screen === IFileManagementSubRoutes.UPLOAD_FILE ? <UploadFile /> : null}
      {/* {screen === IProfileSubRoutes.UPDATE_PROFILE ? <UpdateProfile /> : null} */}
    </div>
  );
};

export default FileManagementModule;
