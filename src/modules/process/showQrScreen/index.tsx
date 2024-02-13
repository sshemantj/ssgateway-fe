import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import styles from "./showQrScreen.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { hideBackNavbar } from "@/store/slices/menu";

const ShowQrScreen = () => {
  const [inputValue, setInputValue] = useState("this is demo 323232");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);

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
