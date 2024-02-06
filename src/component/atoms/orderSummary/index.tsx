import React from "react";
import styles from "./orderSummary.module.scss";

interface IOrderSummary {
  subTotal: string | number;
  charges: string | number;
  discount: string | number;
  total: string | number;
}

const OrderSummary = ({
  charges,
  discount,
  subTotal,
  total,
}: IOrderSummary) => {
  return (
    <div className={styles.orderSummaryWrapper}>
      <div className={`${styles.children}`}>
        <div>Subtotal :</div>
        <div>{subTotal}</div>
      </div>
      <div className={`${styles.children}`}>
        <div>Tax :</div>
        <div>{charges}</div>
      </div>
      <div className={`${styles.children}`}>
        <div>Discount :</div>
        <div>{discount}</div>
      </div>
      <div className={`${styles.children}`}>
        <div>Total :</div>
        <div>{total}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
