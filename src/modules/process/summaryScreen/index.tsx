import React from "react";
import { Button, Grid } from "@mui/material";
import styles from "./summary.module.scss";
import { useAppSelector } from "@/store/hooks";
import ProductItem from "@/component/atoms/productItem";
import OrderSummary from "@/component/atoms/orderSummary";

const SummaryScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);

  const handlePayClick = () => {};

  return (
    <div className={styles.summaryScreenWrapper}>
      <h1 className={styles.title}>Scanned Items</h1>
      <Grid container>
        <Grid item xs={12}>
          {productState.map(({ id, name }, index) => {
            return <ProductItem key={index} {...{ id, name }} />;
          })}
        </Grid>
        <Grid item xs={12}>
          <OrderSummary
            charges={120}
            discount={200}
            subTotal={3400}
            total={3500}
          />
        </Grid>
        <Grid item xs={12} className={styles.btnWrapper}>
          <Button onClick={() => handlePayClick()} variant="contained">
            Pay
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryScreen;
