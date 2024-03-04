import React from "react";
import { Button } from "@mui/material";
import styles from "./customBtn.module.scss";

interface ICustomButton {
  variant?: "dark";
  children: string | JSX.Element;
  style?: React.CSSProperties;
}

const CustomButton = (props: ICustomButton) => {
  const { variant = "dark", children, style = {} } = props;

  return (
    <Button style={style} className={`${styles[variant]}`}>
      {children}
    </Button>
  );
};

export default CustomButton;
