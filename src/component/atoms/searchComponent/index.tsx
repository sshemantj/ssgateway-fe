import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchIcon from "@mui/icons-material/Search";
import useTableData from "@/hooks/useTableData";
import styles from "./searchNav.module.scss";

interface ISearchProps {
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent = (props: ISearchProps) => {
  const { isSearchActive, setIsSearchActive } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const isMobile = useMobileCheck();
  const getTableData = useTableData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchClick = () => {
    getTableData({
      searchTerm: searchValue,
    });
  };

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;
      switch (pressedKey) {
        case "Enter":
          handleSearchClick();
          break;
      }
    },
    []
  );

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
        onKeyDown={handleOnKeyDown}
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
      {isMobile ? (
        <CloseIcon
          onClick={() => setIsSearchActive((prev) => !prev)}
          style={{ margin: "0 1rem 0 0", cursor: "pointer" }}
        />
      ) : (
        <div onClick={() => handleSearchClick()} className={styles.searchIcon}>
          <SearchIcon color="inherit" />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
