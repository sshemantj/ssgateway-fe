import React from "react";
import { MenuItem, TextField } from "@mui/material";
import styles from "./selectDropdown.module.scss";

interface IProps {
  label: string;
  data: {
    label: string;
    value: string | number;
  }[];
}

const SelectDropdown = (props: IProps) => {
  const { data, label } = props;
  return (
    <div className={styles.selectWrapper}>
      <TextField
        className={styles.selectStyles}
        select
        label={label}
        size="medium"
      >
        {data.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default SelectDropdown;
