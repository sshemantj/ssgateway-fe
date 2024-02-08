import React from "react";
import WelcomeScreen from "@/component/atoms/welcomeScreen";
import styles from "./homemodule.module.scss";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.headingWrapper}>
        <p>
          Scan store QR-code <br /> to continue
        </p>
        <CustomQrcodeScanner
          fps={10}
          qrbox={250}
          disableFlip={false}
          defaultZoomValueIfSupported={4}
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
