import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import styles from "./verifyOtp.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();

  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp);
  };

  const handleSubmit = () => {
    router.push(processScreenRoutes.PROCESS_SUMMARY_SCREEN);
  };

  return (
    <div className={styles.verifyOtpWrapper}>
      <h2>Verify Otp</h2>
      <OtpInput
        className={styles.reactOtpCustom}
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
      <Button variant="contained" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};

export default VerifyOtp;
