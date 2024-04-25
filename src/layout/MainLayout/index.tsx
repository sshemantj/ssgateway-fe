import React, { useEffect, useMemo, useRef, useState } from "react";
import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
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
import { getUserChannelMappings } from "@/services/thunks/tableApis";
import { useRouter } from "next/router";
import { IProductsTypes } from "@/interfaces/product";
import { IAllRoutes } from "@/constants/allRoutes";
import ChannelSelectDropDown from "./channelSelectDropdown";
import styles from "./newNavbar.module.scss";
import { useSearchParams } from "next/navigation";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

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
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");
  const getTableData = useTableData();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(
    window.innerWidth < 768
  );
  const [isNavOpen, setisNavOpen] = useState<boolean>(
    typeof shouldNavOpen === "undefined" ? !isMobile : shouldNavOpen
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);
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
    if (isHomePage) {
      dispatch(getUserChannelMappings());
      screen && setProductType(screen as IProducts);
    }
  }, [router, screen]);

  useEffect(() => {
    const isUnapprovedScreen = screen !== IProductsTypes.UNAPPROVED;
    if (
      cookie.get("token") &&
      // isUnapprovedScreen &&
      inputRef &&
      !currValue &&
      !selectedChannel
    ) {
      openChannelDropdown();
    }
  }, [inputRef, currValue, screen]);

  useEffect(() => {
    setCurrValue(selectedChannel);
  }, [selectedChannel]);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    dispatch(setChannelMapping(value));
    setCurrValue(value);
    setOpenSelect(false);
    dispatch(resetHomeTableData());
    productType && dispatch(changePdType(productType as IProducts));
  };

  const handleHamClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setisNavOpen((prev) => !prev);
  };

  const openChannelDropdown = () => {
    inputRef && inputRef?.current?.focus?.();
    setOpenSelect(true);
  };

  const handleProductState = (value: any, path?: any) => {
    dispatch(resetHomeTableData());
    dispatch(changePdType(value));
    if (!isHomePage) {
      router.push(`/?screen=${value}`);
    } else {
      router.push(`/?screen=${value}`);
      if (selectedChannel) {
        if (value === IProductsTypes.UNAPPROVED) {
          getTableData({});
        }
      } else {
        openChannelDropdown();
      }
    }
  };

  const handleTypeClick = (value: any, path: IAllRoutes) => {
    setProductType(value);
    switch (value) {
      case "upload_pending_data":
        router.push("upload-file");
        return;
      case IProductsTypes.UNAPPROVED:
      case IProductsTypes.APPROVED:
        handleProductState(value);
        return;
      case "map_user_with_channels":
        router.push("/map-user-channels");
        return;
    }

    switch (path) {
      case IAllRoutes.MANAGE_CHANNELS:
        router.push(`${path}?screen=${value}`);
        return;
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      {isHomePage ? (
        <ChannelSelectDropDown
          {...{
            channelMappingsArr,
            currValue,
            handleSelectChange,
            openSelect,
            setOpenSelect,
          }}
        />
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
    </div>
  );
};

export default MainLayout;
