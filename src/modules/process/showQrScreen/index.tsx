import React, { ChangeEvent, useState } from "react";
import QRCode from "qrcode.react";
import styles from "./showQrScreen.module.scss";

const ShowQrScreen = () => {
  const [inputValue, setInputValue] = useState("this is demo 323232");

  return (
    <div className={styles.showQrScreenWrapper}>
      <QRCode value={inputValue} />
      <div className={styles.instruction}>
        <h4>Show this QR code to the associate and you are done.</h4>
      </div>
    </div>
  );
};

export default ShowQrScreen;
