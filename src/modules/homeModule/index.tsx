import React from "react";
import { ToastContainer } from "react-toastify";

import { Grid } from "@mui/material";
import styles from "./homemodule.module.scss";
import TreeBox from "@/component/atoms/treeBox";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <TreeBox />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default HomeModule;
