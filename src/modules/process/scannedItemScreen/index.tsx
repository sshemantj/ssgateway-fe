import React from "react";
import { Grid, Paper } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import ProductItem from "@/component/atoms/productItem";
import styles from "./scannedItemScreen.module.scss";
import Subtotal from "@/component/atoms/subtotal";

const ScannedItemScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);
  console.log(productState);
  return (
    <div className={styles.scannedItemWrapper}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1 className={styles.title}>Scanned Items</h1>
        <Grid item xs={12}>
          {productState.map(({ id, name }, index) => {
            return <ProductItem key={index} {...{ id, name }} />;
          })}
        </Grid>
        <Grid item xs={12}>
          <Subtotal subTotal={500} tax={50} total={500} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ScannedItemScreen;
