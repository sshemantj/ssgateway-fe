import React from "react";
import Cards from "@/component/atoms/cards";
import styles from "./demoModule.module.scss";

const DemoModule = () => {
  return (
    <div className={styles.demo_wrapper}>
      <Cards color="primary" />
      <Cards color="success" />
    </div>
  );
};

export default DemoModule;
