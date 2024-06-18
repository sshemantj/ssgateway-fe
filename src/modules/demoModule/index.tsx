import React from "react";
import Cards from "@/component/atoms/cards";
import { Grid } from "@mui/material";
import DateSearch from "@/component/atoms/dateComponent";
import styles from "./demoModule.module.scss";
import { formatDate } from "@/utils";

const DemoModule = () => {
  const handleDateRangeSearch = (startDate: string, endDate: string) => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log({ formattedStartDate, formattedEndDate });
  };

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
                "success",
                "warning",
                "red",
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
        <Grid item xs={12} md={12}>
          <DateSearch onSearch={handleDateRangeSearch} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DemoModule;
