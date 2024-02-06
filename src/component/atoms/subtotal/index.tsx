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
      <div className={`${style.children}`}>
        <div>Subtotal :</div>
        <div>{subTotal}</div>
      </div>
      <div className={`${style.children}`}>
        <div>Tax :</div>
        <div>{tax}</div>
      </div>
      <div className={`${style.children}`}>
        <div>Total :</div>
        <div>{total}</div>
      </div>
    </div>
  );
};

export default Subtotal;
