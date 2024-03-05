import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import { IProduct } from "@/store/slices/processSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";
import dummyImg from "@/images/dummyproduct.png";
import CloseIcon from "@/images/closeIcon.svg";
import styles from "./productItem.module.scss";

interface IProductItem extends IProduct {
  handleQuantityRemove?: (_: string) => void;
  isSummary?: boolean;
  handleRemovePd?: (_: string) => void;
}

const ProductItem = ({
  id,
  name,
  quantity,
  description,
  price,
  discount,
  handleQuantityRemove = () => {},
  handleRemovePd = () => {},
  isSummary = false,
}: IProductItem) => {
  return (
    <div className={styles.productItemsContainer}>
      <div className={styles.pdImgWrapper}>
        <Image src={dummyImg} alt="dummy product" width={100} height={100} />
      </div>
      <div className={styles.pdDescription}>
        <div className={styles.descContainer}>
          <p className={styles.title}>{name}</p>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.pdPriceWrapper}>
          <p className={styles.price}>{price}</p>
          <p className={styles.qnt}>Qty {quantity}</p>
        </div>
      </div>
      <Image
        src={CloseIcon}
        width={15}
        height={15}
        className={styles.closeIcon}
        onClick={() => handleRemovePd(id)}
        alt="close icon"
      />
    </div>
  );
};

export default ProductItem;
