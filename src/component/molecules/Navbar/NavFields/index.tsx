import React, { useRef, useState } from "react";
import CustomTab from "@/component/atoms/customTab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  IProducts,
  changePdType,
  resetHomeTableData,
  setChannelMapping,
} from "@/store/slices/gatewaySlice";
import useTableData from "@/hooks/useTableData";
import SelectDropdown from "../../selectDropdown";
import SearchBar from "../../SearchBar";
import styles from "./navfields.module.scss";
import { useMobileCheck } from "@/hooks/useMobileCheck";

const NavFields = () => {
  const [productType, setProductType] = useState<IProducts>();
  const [openSelect, setOpenSelect] = useState(false);
  const [currValue, setCurrValue] = useState("");
  const [search, setSearch] = useState<string>("");
  const isMobile = useMobileCheck();
  const { userChannelMappings, selectedChannel, pdType } = useAppSelector(
    (state) => state.gateway
  );

  const channelMappingsArr =
    userChannelMappings?.map((item: any) => {
      return {
        label: item.channelName,
        value: item.channelId,
      };
    }) || [];

  const inputRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const getTableData = useTableData();

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    dispatch(setChannelMapping(value));
    setCurrValue(value);
    setOpenSelect(false);
    dispatch(resetHomeTableData());
    // productType && getTableData({ channelid: value, type: productType });
    dispatch(changePdType(productType as IProducts));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setProductType(newValue);
    if (selectedChannel) {
      dispatch(resetHomeTableData());
      dispatch(changePdType(newValue));
      if (newValue === "unAprovedProducts") {
        getTableData({});
      }
    } else {
      inputRef && inputRef?.current?.focus?.();
      setOpenSelect(true);
    }
  };

  const handleSearchClick = () => {
    getTableData({
      searchTerm: search,
    });
  };

  return (
    <>
      {userChannelMappings?.length && (
        <SelectDropdown
          ref={inputRef}
          open={openSelect}
          onClick={(e) => {
            e.stopPropagation();
            setOpenSelect((v) => !v);
          }}
          onMenuClick={() => {
            setOpenSelect((v) => !v);
          }}
          selectSx={{
            "& .MuiInputBase-input": {
              padding: "5px",
            },
            "& fieldset legend": {
              display: "none",
            },
            "& label": {
              top: currValue ? 0 : "-12px",
              display: currValue ? "none" : "unset",
            },
            "& .MuiInputLabel-shrink": {
              top: "15px",
            },
          }}
          selectStyles={{
            marginLeft: isMobile ? "unset" : "1rem",
            minWidth: "2rem",
            width: isMobile ? "100%" : "10rem",
          }}
          selectWrapperStyle={{ padding: "0" }}
          handleOnChange={handleSelectChange}
          label={"Select channel..."}
          data={channelMappingsArr}
        />
      )}
      <CustomTab
        type={1}
        value={selectedChannel ? productType : ""}
        handleChange={handleChange}
        containerSx={{
          margin: isMobile ? "unset" : "0 0 0 1.5rem",
        }}
        buttonList={[
          { label: "unapproved variants", value: "unAprovedProducts" },
          { label: "approved variants", value: "aprovedProducts" },
        ]}
      />
      {pdType && (
        <div className={styles.searchContainer}>
          <SearchBar
            handleSearchClick={handleSearchClick}
            value={search}
            setSearch={setSearch}
          />
        </div>
      )}
    </>
  );
};

export default NavFields;
