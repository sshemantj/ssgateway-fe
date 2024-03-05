import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./treeBox.module.scss";

const TreeBox = () => {
  return (
    <div className={styles.treeBoxWrapper}>
      <div className={styles.textWrapper}>
        <p>Product</p>
      </div>
      <div className={styles.plusIcon}>
        <AddCircleIcon />
      </div>
    </div>
  );
};

export default TreeBox;
