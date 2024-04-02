import React from "react";
import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import styles from "./selectDropdown.module.scss";

interface IProps {
  label: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectSx?: SxProps<Theme>;
  selectWrapperStyle?: React.CSSProperties;
  selectStyles?: React.CSSProperties;
  data: {
    label: string;
    value: string | number;
  }[];
}

const SelectDropdown = (props: IProps) => {
  const {
    data,
    label,
    handleOnChange,
    selectSx = {},
    selectWrapperStyle = {},
    selectStyles = {},
  } = props;
  return (
    <div style={selectWrapperStyle} className={styles.selectWrapper}>
      <TextField
        className={styles.selectStyles}
        style={selectStyles}
        select
        label={label}
        size="medium"
        onChange={handleOnChange}
        sx={selectSx}
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
