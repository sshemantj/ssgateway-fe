import React from "react";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ProductItem from "@/component/atoms/productItem";
import Subtotal from "@/component/atoms/subtotal";
import styles from "./scannedItemScreen.module.scss";
import { useRouter } from "next/router";
import { allRoutes, processScreenRoutes } from "@/constants/allRoutes";
import { removeProduct } from "@/store/slices/processSlice";
import CustomButton from "@/component/atoms/customButton";

const ScannedItemScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleScanMore = () => {
    router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN);
  };

  const handleCheckout = () => {
    const isLogin = false;
    if (isLogin) {
      router.push(processScreenRoutes.PROCESS_SUMMARY_SCREEN);
    } else {
      router.push({
        pathname: allRoutes.LOGIN,
        query: { showBack: true },
      });
    }
  };

  const handleQuantityRemove = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <Grid container className={styles.scannedItemWrapper}>
      <Grid item xs={12} className={styles.scannedItemContainer}>
        <p className={styles.title}>Scanned Items</p>
        <Grid item xs={12}>
          {productState.map((pd, index) => {
            return (
              <ProductItem
                key={index}
                handleQuantityRemove={handleQuantityRemove}
                {...pd}
              />
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Subtotal subTotal={500} tax={50} total={500} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.btnWrapper}>
        <CustomButton
          style={{ fontWeight: 600, width: "100%" }}
          onClick={() => handleScanMore()}
          variant="dark"
        >
          Scan more
        </CustomButton>
        <CustomButton
          style={{ fontWeight: 600, width: "100%" }}
          onClick={() => handleCheckout()}
          variant="dark"
        >
          Check out
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default ScannedItemScreen;
