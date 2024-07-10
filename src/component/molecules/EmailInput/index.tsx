import TextField from "@mui/material/TextField";
import React, { ChangeEvent, FocusEvent } from "react";

interface EmailInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <TextField
      type="email"
      InputLabelProps={{
        style: { top: "-0.3rem" },
      }}
      inputProps={{
        style: {
          width: "280px",
          height: "0.4rem",
        },
      }}
      value={value}
      name="email"
      label="Email"
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
    />
  );
};
export default EmailInput;
