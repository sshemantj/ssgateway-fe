import React from "react";
import { Button } from "@mui/material";
import styles from "./customBtn.module.scss";

interface ICustomButton {
  variant?: "dark";
  children: string | JSX.Element;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const CustomButton = (props: ICustomButton) => {
  const { variant = "dark", children, style = {}, disabled = false } = props;

  return (
    <Button
      disabled={disabled}
      style={style}
      className={`${styles[variant]} ${disabled && styles.disabled}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
