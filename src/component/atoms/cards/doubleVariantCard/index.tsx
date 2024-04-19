import React, { useState } from "react";
import { IBaseCardProps } from "..";
import styles from "./doubleVariant.module.scss";

type IState = "mappedProducts" | "aprovedProducts";
interface IProps extends Omit<IBaseCardProps, "variant"> {
  unMappedCount: number;
  mappedCount: number;
  handleChange: (_: any) => void;
}

const DoubleVariantCard = (props: IProps) => {
  const { color = "primary", mappedCount, unMappedCount, handleChange } = props;
  const [selected, setSelected] = useState<IState>("aprovedProducts");

  const handleClick = (type: any) => {
    handleChange(type);
    setSelected(type);
  };

  return (
    <div className={styles.doubleVariant}>
      <div
        className={`${styles.lhs_wrapper} ${
          selected === "aprovedProducts" && styles.selected
        }`}
      >
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Unmapped</p>
        </div>
        <div
          onClick={() => handleClick("aprovedProducts")}
          className={styles.value_wrapper}
        >
          <p className={styles.value}>{unMappedCount}</p>
        </div>
      </div>
      <div
        className={`${styles.rhs_wrapper}
      ${selected === "mappedProducts" && styles.selected}
      `}
      >
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Mapped</p>
        </div>
        <div
          onClick={() => handleClick("mappedProducts")}
          className={styles.value_wrapper}
        >
          <p className={styles.value}>{mappedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DoubleVariantCard;
