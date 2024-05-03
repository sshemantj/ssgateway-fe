import React, { useCallback, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { IProducts } from "@/store/slices/gatewaySlice";
import { fetchTableData } from "@/services/thunks/tableApis";
import styles from "./searchNav.module.scss";

interface ISearchProps {
  isSearchActive?: boolean;
  setIsSearchActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent = (props: ISearchProps) => {
  const { isSearchActive, setIsSearchActive } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const { pdType, subPdType, selectedChannel } = useAppSelector(
    (state) => state.gateway
  );
  const isMobile = useMobileCheck();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  useEffect(() => {
    setSearchValue("");
  }, [pdType, subPdType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchClick = (
    value: string,
    sPdType: IApprovedPdTypes | "",
    pType: IProducts
  ) => {
    const type = screen === IProductsTypes.APPROVED ? sPdType : pType;
    if (searchValue) {
      dispatch(
        fetchTableData({
          channelid: selectedChannel,
          type: type,
          searchTerm: value,
        })
      );
    }
  };

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;
      switch (pressedKey) {
        case "Enter":
          handleSearchClick(searchValue, subPdType, pdType);
          break;
      }
    },
    [searchValue, subPdType, pdType]
  );

  return (
    <div
      className={`${styles.searchValueContainer} ${
        isSearchActive ? styles.isActive : null
      }`}
    >
      <TextField
        style={{ width: "unset" }}
        placeholder="search..."
        className={styles.searchInput}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
        sx={{
          "& fieldset": { border: "none" },
        }}
        inputProps={{
          sx: {
            padding: "6px",
            marginTop: "12px",
          },
        }}
      />
      {isMobile ? (
        <CloseIcon
          // onClick={() => setIsSearchActive((prev) => !prev)}
          style={{ margin: "0 1rem 0 0", cursor: "pointer" }}
        />
      ) : (
        <div
          onClick={() => handleSearchClick(searchValue, subPdType, pdType)}
          className={styles.searchIcon}
        >
          <SearchIcon color="inherit" />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
