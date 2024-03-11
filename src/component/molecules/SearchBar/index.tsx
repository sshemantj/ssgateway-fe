import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import styles from "./searchBar.module.scss";
import Image from "next/image";
import { searchIcon } from "@/images/AllDataIcons";
// import { useDebounce } from "@/hooks/useDebounce";

interface IProps {
  value: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearchClick: () => void;
}

const SearchBar = (props: IProps) => {
  const { value, setSearch, handleSearchClick } = props;

  // const delayedValue = useDebounce(value, 1000);

  // const handleSearch = () => {
  //   alert(value);
  // };

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
    <div className={styles.searchWrapper}>
      <TextField
        className={`${styles.input}`}
        size="small"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleOnKeyDown}
        placeholder="search here..."
      />
      <div onClick={() => handleSearchClick()} className={styles.searchIcon}>
        <Image src={searchIcon} alt="search" width={25} height={25} />
      </div>
    </div>
  );
};

export default SearchBar;
