import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import styles from "./productItem.module.scss";
import { IProduct } from "@/store/slices/processSlice";

const ProductItem = ({ id, name, quantity }: IProduct) => {
  return (
    <div className={styles.productItemsContainer}>
      <div className={styles.pdImgWrapper}>
        <InventoryIcon fontSize="large" color="action" />
      </div>
      <div className={styles.pdDescription}>
        <h4>ID: {id}</h4>
        <h4>Name: {name}</h4>
        <h4>Quantity: {quantity}</h4>
      </div>
    </div>
  );
};

export default ProductItem;
