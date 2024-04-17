import React from "react";
import { IBaseCardProps } from "..";
import styles from "./doubleVariant.module.scss";

const DoubleVariantCard = (props: Omit<IBaseCardProps, "variant">) => {
  const { color = "primary" } = props;
  return (
    <div className={styles.doubleVariant}>
      <div className={styles.lhs_wrapper}></div>
      <div className={styles.rhs_wrapper}></div>
    </div>
  );
};

export default DoubleVariantCard;
