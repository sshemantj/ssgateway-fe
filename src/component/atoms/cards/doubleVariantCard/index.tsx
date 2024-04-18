import React from "react";
import { IBaseCardProps } from "..";
import styles from "./doubleVariant.module.scss";

const DoubleVariantCard = (props: Omit<IBaseCardProps, "variant">) => {
  const { color = "primary" } = props;
  return (
    <div className={styles.doubleVariant}>
      <div className={styles.lhs_wrapper}>
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Unmapped</p>
        </div>
        <div className={styles.value_wrapper}>
          <p className={styles.value}>221</p>
        </div>
      </div>
      <div className={styles.rhs_wrapper}>
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Mapped</p>
        </div>
        <div className={styles.value_wrapper}>
          <p className={styles.value}>521</p>
        </div>
      </div>
    </div>
  );
};

export default DoubleVariantCard;
