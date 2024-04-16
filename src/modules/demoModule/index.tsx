import React from "react";
import Cards from "@/component/atoms/cards";
import styles from "./demoModule.module.scss";

const DemoModule = () => {
  return (
    <div className={styles.demo_wrapper}>
      <Cards variant="primary" />
      <Cards variant="success" />
      <Cards variant="warning" />
    </div>
  );
};

export default DemoModule;
