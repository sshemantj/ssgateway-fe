import React from "react";
import { ToastContainer } from "react-toastify";
import styles from "./homemodule.module.scss";
import TreeGateway from "@/component/molecules/treeGateway";
import CustomMadeTable from "@/component/molecules/CustomMadeTable";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <CustomMadeTable />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomeModule;
