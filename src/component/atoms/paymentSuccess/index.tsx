import React from "react";
import styles from "./paymentSuccess.module.scss";

const PaymentSuccess = () => {
  return (
    <div className={styles.paymentSuccessWrapper}>
      <div className={styles.content}>
        <svg width="200" height="200">
          <circle
            className={styles.circle}
            fill="none"
            stroke="#68E534"
            strokeWidth="20"
            cx="200"
            cy="200"
            r="190"
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
          />
          <polyline
            className={styles.tick}
            fill="none"
            stroke="#68E534"
            points="88,214 173,284 304,138"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3>Payment Successful</h3>
      </div>
    </div>
  );
};

export default PaymentSuccess;
