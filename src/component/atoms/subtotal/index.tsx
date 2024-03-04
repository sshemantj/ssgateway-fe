import React from "react";
import style from "./subtotal.module.scss";

interface ISubTotal {
  subTotal: string | number;
  tax: string | number;
  total: string | number;
}

const Subtotal = ({ subTotal, tax, total }: ISubTotal) => {
  return (
    <div className={style.subtotalWrapper}>
      <div className={`${style.titleWrapper}`}>
        <p>PRICE DETAILS</p>
      </div>
      <div className={`${style.commonFields}`}>
        <p className={style.key}>Total MRP</p>
        <p className={style.value}>1,299</p>
      </div>
      <div className={`${style.commonFields}`}>
        <p className={style.key}>Offer Discount</p>
        <p className={style.value}>- 299</p>
      </div>
      <div className={`${style.totalWrapper}`}>
        <p className={style.key}>Total Payable Amount</p>
        <p className={style.value}>- 1,000</p>
      </div>
    </div>
  );
};

export default Subtotal;
