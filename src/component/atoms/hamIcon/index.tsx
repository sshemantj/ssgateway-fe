import React from "react";
import styles from "./hamIcon.module.scss";

const HamIcon = () => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="checkbox1"
        className={`${styles.checkbox1} ${styles.visuallyHidden}`}
      />
      <label htmlFor="checkbox1">
        <div className={`${styles.hamburger} ${styles.hamburger1}`}>
          <span className={`${styles.bar} ${styles.bar1}`}></span>
          <span className={`${styles.bar} ${styles.bar2}`}></span>
          <span className={`${styles.bar} ${styles.bar3}`}></span>
          <span className={`${styles.bar} ${styles.bar4}`}></span>
        </div>
      </label>
    </div>
  );
};

export default HamIcon;
