import React from "react";
import { Grid, Paper } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import styles from "./scannedItemScreen.module.scss";

const ScannedItemScreen = () => {
  const productState = useAppSelector((state) => state.process.productList);
  console.log(productState);
  return (
    <div className={styles.scannedItemWrapper}>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h1>Scanned Items</h1>
          <Grid item xs={12}>
            {productState.map((item, index) => {
              return (
                <div key={index}>
                  <h4>ID: {item.id}</h4>
                  <h4>Name: {item.name}</h4>
                  <br />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ScannedItemScreen;
