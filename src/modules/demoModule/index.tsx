import React from "react";
import Cards from "@/component/atoms/cards";
import styles from "./demoModule.module.scss";
import { Grid } from "@mui/material";

const DemoModule = () => {
  return (
    <div className={styles.demo_wrapper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Cards color="success" />
        </Grid>
        <Grid item xs={12} md={8} spacing={2}>
          <Grid container spacing={2}>
            {(
              [
                "primary",
                "success",
                "warning",
                "red",
                "primary",
                "success",
                "warning",
                "red",
                "primary",
              ] as const
            ).map((color, index) => {
              return (
                <Grid key={index} item xs={12} md={4}>
                  <Cards color={color} variant="sm" />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DemoModule;
