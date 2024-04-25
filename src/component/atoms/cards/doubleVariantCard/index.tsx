import React from "react";
import { IBaseCardProps } from "..";
import styles from "./doubleVariant.module.scss";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { useAppSelector } from "@/store/hooks";

type IState = IApprovedPdTypes.MAPPED | IApprovedPdTypes.UN_MAPPED;
interface IProps extends Omit<IBaseCardProps, "variant"> {
  unMappedCount: number;
  mappedCount: number;
  handleChange: (_: any) => void;
}

const DoubleVariantCard = (props: IProps) => {
  const { mappedCount, unMappedCount, handleChange } = props;
  const { subPdType } = useAppSelector((state) => state.gateway);

  const handleClick = (type: any) => {
    handleChange(type);
  };

  return (
    <div className={styles.doubleVariant}>
      <div
        className={`${styles.lhs_wrapper} ${
          subPdType === IApprovedPdTypes.UN_MAPPED && styles.selected
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
      ${subPdType === IApprovedPdTypes.MAPPED && styles.selected}
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
