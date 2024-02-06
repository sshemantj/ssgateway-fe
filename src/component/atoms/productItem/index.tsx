import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import styles from "./productItem.module.scss";

interface IProductsItem {
  id: string;
  name: string;
}

const ProductItem = ({ id, name }: IProductsItem) => {
  return (
    <div className={styles.productItemsContainer}>
      <div className={styles.pdImgWrapper}>
        <InventoryIcon fontSize="large" color="action" />
      </div>
      <div className={styles.pdDescription}>
        <h4>ID: {id}</h4>
        <h4>Name: {name}</h4>
      </div>
    </div>
  );
};

export default ProductItem;
