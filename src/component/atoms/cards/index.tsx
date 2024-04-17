import React from "react";
import Linechart from "@/charts/linechart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import styles from "./cards.module.scss";

interface IProps {
  color?: "success" | "primary" | "warning" | "red";
  variant?: "base" | "sm" | "md" | "lg";
}

const Cards = (props: IProps) => {
  const { variant = "md", ...rest } = props;
  return (
    <div className={styles.card_wrapper}>
      {variant === "sm" ? <SmallCardVariant {...rest} /> : null}
      {variant === "md" ? <MediumCardVariant {...rest} /> : null}
    </div>
  );
};

function SmallCardVariant(props: Omit<IProps, "variant">) {
  const { color = "primary" } = props;
  return (
    <div className={styles.small_variant_card}>
      <div className={styles.topContainer}>
        <div className={styles.text_section}>
          <h2 className={styles.count}>$30200</h2>
          <p className={styles.subtitle}>All earnings.</p>
        </div>
        <div className={styles.icon_wrapper}>
          <StackedBarChartIcon color="inherit" style={{ fontSize: "3rem" }} />
        </div>
      </div>
      <div className={`${styles.bottomContainer} ${styles[color]}`}>
        <p>% change</p>
        <TrendingUpIcon />
      </div>
    </div>
  );
}

function MediumCardVariant(props: Omit<IProps, "variant">) {
  const { color = "primary" } = props;
  return (
    <div className={styles.medium_variant_card}>
      <div className={styles.topContainer}>
        <h2 className={styles.count}>350</h2>
        <p className={styles.subtitle}>Support Requests</p>
        <p className={styles.description}>
          Total number of support requests that come in.
        </p>
      </div>
      <div className={styles.bottomContainer}>
        <Linechart />
        <div className={`${styles.pannel_wrapper} ${styles[color]}`}>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>10</p>
            <p className={styles.b_panel_text}>Open</p>
          </div>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>5</p>
            <p className={styles.b_panel_text}>Running</p>
          </div>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>3</p>
            <p className={styles.b_panel_text}>Solved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
