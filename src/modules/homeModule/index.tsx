import React from "react";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import styles from "./homemodule.module.scss";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <WelcomeScreen />
    </div>
  );
};

export default HomeModule;
