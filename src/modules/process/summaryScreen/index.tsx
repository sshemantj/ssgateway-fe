import React from "react";
import { Button, Grid } from "@mui/material";
import styles from "./summary.module.scss";
import { useAppSelector } from "@/store/hooks";
import ProductItem from "@/component/atoms/productItem";

const SummaryScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);

  return (
    <div className={styles.summaryScreenWrapper}>
      <h1 className={styles.title}>Scanned Items</h1>
      <Grid container>
        <Grid item xs={12}>
          {productState.map(({ id, name }, index) => {
            return <ProductItem key={index} {...{ id, name }} />;
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryScreen;
