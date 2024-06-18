// DateSearch.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const DateSearch = ({ onSearch }: IProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(startDate, endDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "1rem 0", padding: "0 8px" }}
    >
      <TextField
        id="start-date"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginRight: "10px" }}
        inputProps={{
          sx: {
            padding: "6px",
          },
        }}
      />
      <TextField
        id="end-date"
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginRight: "10px" }}
        inputProps={{
          sx: {
            padding: "6px",
          },
        }}
      />
      <Button variant="contained" type="submit">
        Search
      </Button>
    </form>
  );
};

export default DateSearch;
