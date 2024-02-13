import React from "react";
import { Button, Grid } from "@mui/material";
import styles from "./summary.module.scss";
import { useAppSelector } from "@/store/hooks";
import ProductItem from "@/component/atoms/productItem";
import OrderSummary from "@/component/atoms/orderSummary";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";

const SummaryScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);
  const router = useRouter();

  const handlePayClick = () => {
    router.push(processScreenRoutes.PROCESS_PAYMENT_SCREEN);
  };

  return (
    <div className={styles.summaryScreenWrapper}>
      <h1 className={styles.title}>Scanned Items</h1>
      <Grid container>
        <Grid item xs={12}>
          {productState.map((pd, index) => {
            return <ProductItem key={index} {...pd} isSummary />;
          })}
        </Grid>
        <Grid item xs={12}>
          <OrderSummary
            charges={120}
            discount={200}
            subTotal={3400}
            total={3320}
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
