import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import { IProduct } from "@/store/slices/processSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "./productItem.module.scss";

interface IProductItem extends IProduct {
  handleQuantityRemove?: (_: string) => void;
  isSummary?: boolean;
}

const ProductItem = ({
  id,
  name,
  quantity,
  handleQuantityRemove = () => {},
  isSummary = false,
}: IProductItem) => {
  return (
    <div className={styles.productItemsContainer}>
      <div className={styles.pdImgWrapper}>
        <InventoryIcon fontSize="large" color="action" />
      </div>
      <div className={styles.pdDescription}>
        <h4>ID: {id}</h4>
        <h4>Name: {name}</h4>
        <div className={styles.qntRemove}>
          <h4>Quantity: {quantity}</h4>
          {isSummary ? null : (
            <DeleteOutlineIcon
              onClick={() => handleQuantityRemove(id)}
              color="error"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
