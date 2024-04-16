import React from "react";
import styles from "./cards.module.scss";
import Linechart from "@/charts/linechart";

interface IProps {
  variant?: "base";
}

const Cards = (props: IProps) => {
  const { variant = "base" } = props;
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.topContainer}>
        <h2 className={styles.count}>350</h2>
        <p className={styles.subtitle}>Support Requests</p>
        <p className={styles.description}>
          Total number of support requests that come in.
        </p>
      </div>
      <div className={styles.bottomContainer}>
        <Linechart />
        <div className={styles.pannel_wrapper}>
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
};

export default Cards;
