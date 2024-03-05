import React from "react";
import { ToastContainer } from "react-toastify";
import styles from "./homemodule.module.scss";
import TreeGateway from "@/component/molecules/treeGateway";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <TreeGateway />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomeModule;
