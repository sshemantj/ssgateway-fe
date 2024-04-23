import React, { useState } from "react";
import { IBaseCardProps } from "..";
import styles from "./doubleVariant.module.scss";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";

type IState = IApprovedPdTypes.MAPPED | IApprovedPdTypes.UN_MAPPED;
interface IProps extends Omit<IBaseCardProps, "variant"> {
  unMappedCount: number;
  mappedCount: number;
  handleChange: (_: any) => void;
}

const DoubleVariantCard = (props: IProps) => {
  const { color = "primary", mappedCount, unMappedCount, handleChange } = props;
  const [selected, setSelected] = useState<IState>(IApprovedPdTypes.UN_MAPPED);

  const handleClick = (type: any) => {
    handleChange(type);
    setSelected(type);
  };

  return (
    <div className={styles.doubleVariant}>
      <div
        className={`${styles.lhs_wrapper} ${
          selected === IApprovedPdTypes.UN_MAPPED && styles.selected
        }`}
      >
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Unmapped</p>
        </div>
        <div
          onClick={() => handleClick(IApprovedPdTypes.UN_MAPPED)}
          className={styles.value_wrapper}
        >
          <p className={styles.value}>{unMappedCount}</p>
        </div>
      </div>
      <div
        className={`${styles.rhs_wrapper}
      ${selected === IApprovedPdTypes.MAPPED && styles.selected}
      `}
      >
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Mapped</p>
        </div>
        <div
          onClick={() => handleClick(IApprovedPdTypes.MAPPED)}
          className={styles.value_wrapper}
        >
          <p className={styles.value}>{mappedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DoubleVariantCard;
