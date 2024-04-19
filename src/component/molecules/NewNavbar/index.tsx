import React, { useEffect, useRef, useState } from "react";
import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchComponent from "@/component/atoms/searchComponent";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
import Breadcrumbs from "@/component/atoms/breadcrumb";
import SelectDropdown from "../selectDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  IProducts,
  changePdType,
  resetHomeTableData,
  setChannelMapping,
} from "@/store/slices/gatewaySlice";
import styles from "./newNavbar.module.scss";
import useTableData from "@/hooks/useTableData";

interface IProps {
  children: JSX.Element;
  shouldNavOpen?: boolean;
}

const NewNavBar = (props: IProps) => {
  const { children, shouldNavOpen } = props;
  const isMobile = useMobileCheck();
  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(
    window.innerWidth < 768
  );
  const [isNavOpen, setisNavOpen] = useState<boolean>(
    typeof shouldNavOpen === "undefined" ? !isMobile : shouldNavOpen
  );
  const [openSelect, setOpenSelect] = useState(false);
  const [currValue, setCurrValue] = useState("");
  const [productType, setProductType] = useState<IProducts>();

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

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    dispatch(setChannelMapping(value));
    setCurrValue(value);
    setOpenSelect(false);
    dispatch(resetHomeTableData());
    // productType && getTableData({ channelid: value, type: productType });
    productType && dispatch(changePdType(productType as IProducts));
  };

  const handleHamClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setisNavOpen((prev) => !prev);
  };

  const handleTypeClick = (type: any) => {
    setProductType(type);
    if (selectedChannel) {
      dispatch(resetHomeTableData());
      dispatch(changePdType(type));
      if (type === "unAprovedProducts") {
        getTableData({});
      }
    } else {
      inputRef && inputRef?.current?.focus?.();
      setOpenSelect(true);
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      <div className={styles.channel_select_wrapper}>
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
              // marginLeft: isMobile ? "unset" : "1rem",
              minWidth: "2rem",
              width: isMobile ? "100%" : "10rem",
            }}
            selectWrapperStyle={{ padding: "0" }}
            handleOnChange={handleSelectChange}
            label={"Select channel..."}
            data={channelMappingsArr}
          />
        )}
      </div>
      <nav className={styles.navContainer}>
        <div className={styles.lhs_Wrapper}>
          <div className={styles.logoText}>
            <p className={styles.first}>Configuration</p>
            <p className={styles.second}>Panel</p>
          </div>
          <div onClick={(e) => handleHamClick(e)} className={styles.hamBurger}>
            <HamIcon checked={isNavOpen} />
          </div>
          {!isMobile ? (
            <div className={styles.searchIcon}>
              <SearchIcon
                onClick={() => setIsSearchActive((prev) => !prev)}
                color="inherit"
              />
            </div>
          ) : null}
        </div>
        {!isMobile ? (
          <RhsWrapper />
        ) : (
          <>
            <div className={styles.m_logoText}>
              <p className={styles.first}>Configuration</p>
              <p className={styles.second}>Panel</p>
            </div>
            {/* <div className={styles.moreIcon}>
              <MoreVertIcon color="inherit" />
            </div> */}
            <div className={styles.searchIcon}>
              <SearchIcon
                onClick={() => setIsSearchActive((prev) => !prev)}
                color="inherit"
              />
            </div>
          </>
        )}
      </nav>
      <div className={styles.navListWrapper}>
        <NavList {...{ handleTypeClick, isNavOpen }} />
        <main className={styles.mainWrapper}>
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumbs />
            {pdType && (
              <SearchComponent {...{ isSearchActive, setIsSearchActive }} />
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default NewNavBar;
