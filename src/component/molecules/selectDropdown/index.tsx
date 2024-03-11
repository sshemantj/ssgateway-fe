import React from "react";
import { MenuItem, TextField } from "@mui/material";
import styles from "./selectDropdown.module.scss";

interface IProps {
  label: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  data: {
    label: string;
    value: string | number;
  }[];
}

const SelectDropdown = (props: IProps) => {
  const { data, label, handleOnChange } = props;
  return (
    <div className={styles.selectWrapper}>
      <TextField
        className={styles.selectStyles}
        select
        label={label}
        size="medium"
        onChange={handleOnChange}
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
