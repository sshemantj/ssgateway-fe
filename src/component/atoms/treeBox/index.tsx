import React from "react";
import styles from "./treeBox.module.scss";
import { useAppSelector } from "@/store/hooks";

const TreeBox = () => {
  const pdjson = useAppSelector((state) => state.gateway.value);
  console.log(pdjson);
  return (
    <div className={styles.treeBoxWrapper}>
      <div className={styles.textWrapper}>
        <p>product</p>
      </div>
    </div>
  );
};

export default TreeBox;
