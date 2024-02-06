import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import PaymentSuccess from "@/component/atoms/paymentSuccess";
import styles from "./paymentScreen.module.scss";

const PaymentScreen = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = () => {
    setPaymentSuccess(true);
    setTimeout(
      () => router.push(processScreenRoutes.PROCESS_SHOW_QR_SCREEN),
      3000
    );
  };

  return (
    <div className={styles.selectPaymentWrapper}>
      {paymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <div>
          <h3 className={styles.title}>Select payment method</h3>
          <div className={styles.cards}>Credit/debit card</div>
          <div className={styles.cards}>Net banking</div>
          <div className={styles.cards}>Wallet</div>
          <Button onClick={() => handlePlaceOrder()} variant="contained">
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
