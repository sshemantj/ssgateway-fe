import React from "react";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import styles from "./homemodule.module.scss";
import CustomBarcodeScanner2 from "@/component/molecules/customBarcodeScanner2";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.headingWrapper}>
        <p>
          Scan store QR-code <br /> to continue
        </p>
        <CustomBarcodeScanner2
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(result) => console.log(result)}
          qrCodeErrorCallback={(error) => console.log(error)}
          showZoomSliderIfSupported={true}
        />
      </div>
      <WelcomeScreen />
    </div>
  );
};

export default HomeModule;
