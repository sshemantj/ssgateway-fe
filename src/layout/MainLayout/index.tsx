import React, { useEffect, useMemo, useRef, useState } from "react";
import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchComponent from "@/component/atoms/searchComponent";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
import Breadcrumbs from "@/component/atoms/breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  IProducts,
  changePdType,
  resetHomeTableData,
  setChannelMapping,
} from "@/store/slices/gatewaySlice";
import useTableData from "@/hooks/useTableData";
import CreateChannelModal from "./createChannelModal";
import { getUserChannelMappings } from "@/services/thunks/tableApis";
import styles from "./newNavbar.module.scss";
import { useRouter } from "next/router";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { IProductsTypes } from "@/interfaces/product";

interface IProps {
  children: JSX.Element;
  shouldNavOpen?: boolean;
}

const MainLayout = (props: IProps) => {
  const { children, shouldNavOpen } = props;
  const isMobile = useMobileCheck();
  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getTableData = useTableData();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(
    window.innerWidth < 768
  );
  const [isNavOpen, setisNavOpen] = useState<boolean>(
    typeof shouldNavOpen === "undefined" ? !isMobile : shouldNavOpen
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openCreateChannel, setOpenCreateChannel] = useState<boolean>(false);
  const [currValue, setCurrValue] = useState("");
  const [productType, setProductType] = useState<IProducts>();

  const { userChannelMappings, selectedChannel, pdType } = useAppSelector(
    (state) => state.gateway
  );

  const isHomePage = useMemo(() => router.pathname === "/", [router.pathname]);

  const channelMappingsArr =
    (Array.isArray(userChannelMappings) &&
      userChannelMappings?.map((item: any) => {
        return {
          label: item.channelName,
          value: item.channelId,
        };
      })) ||
    [];

  useEffect(() => {
    isHomePage && dispatch(getUserChannelMappings());
  }, [router]);

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

  const handleProductState = (type: any) => {
    dispatch(resetHomeTableData());
    dispatch(changePdType(type));
    if (!isHomePage) {
      router.push(`/?screen=${type}`);
    } else {
      router.push(`/?screen=${type}`);
      if (selectedChannel) {
        if (type === IProductsTypes.UNAPPROVED) {
          getTableData({});
        }
      } else {
        inputRef && inputRef?.current?.focus?.();
        setOpenSelect(true);
      }
    }
  };

  const handleTypeClick = (type: any) => {
    setProductType(type);
    switch (type) {
      case "create_channel":
        setOpenCreateChannel(true);
        return;
      case "upload_pending_data":
        router.push("upload-file");
        return;
      case IProductsTypes.UNAPPROVED:
      case IProductsTypes.APPROVED:
        handleProductState(type);
        return;
      case "map_user_with_channels":
        router.push("/map-user-channels");
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      {isHomePage ? (
        <div className={styles.channel_select_wrapper}>
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
              minWidth: "2rem",
              width: isMobile ? "100%" : "10rem",
            }}
            selectWrapperStyle={{ padding: "0" }}
            handleOnChange={handleSelectChange}
            label={"Select channel..."}
            data={channelMappingsArr}
          />
        </div>
      ) : null}
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
            {pdType && isHomePage && (
              <SearchComponent {...{ isSearchActive, setIsSearchActive }} />
            )}
          </div>
          {children}
        </main>
      </div>
      <CreateChannelModal {...{ openCreateChannel, setOpenCreateChannel }} />
    </div>
  );
};

export default MainLayout;
