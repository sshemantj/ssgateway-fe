import React, { useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./searchNav.module.scss";
import zIndex from "@mui/material/styles/zIndex";

interface ISearchProps {
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent = (props: ISearchProps) => {
  const { isSearchActive, setIsSearchActive } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div
      className={`${styles.searchValueContainer} ${
        isSearchActive ? styles.isActive : null
      }`}
    >
      <TextField
        style={{ width: "100%" }}
        placeholder="search..."
        className={styles.searchInput}
        value={searchValue}
        onChange={handleChange}
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
      <CloseIcon
        onClick={() => setIsSearchActive((prev) => !prev)}
        style={{ margin: "0 1rem 0 0", cursor: "pointer" }}
      />
    </div>
  );
};

export default SearchComponent;
