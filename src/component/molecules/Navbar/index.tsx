import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import hamsvg from "@/images/ham.svg";
import logosvg from "@/images/logo.svg";
import {
  bagIcon,
  barCodeScanIcon,
  heartIcon,
  searchIcon,
} from "@/images/AllDataIcons";
import LogoutModal from "../LogoutModal";
import CustomTab from "@/component/atoms/customTab";
import {
  IProducts,
  changePdType,
  resetHomeTableData,
  setChannelMapping,
} from "@/store/slices/gatewaySlice";
import { getUserChannelMappings } from "@/services/thunks/tableApis";
import SelectDropdown from "../selectDropdown";
import useTableData from "@/hooks/useTableData";

interface INavbar {
  showBackBtn?: boolean;
}

const Navbar = ({ showBackBtn = false }: INavbar) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isShowNav, setIsShowNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [currValue, setCurrValue] = useState("");
  const [productType, setProductType] = useState<IProducts>();
  const { showBackInNavbar } = useAppSelector((state) => state.menu);
  const { userChannelMappings, selectedChannel } = useAppSelector(
    (state) => state.gateway
  );
  const getTableData = useTableData();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const showBack = router.query.showBack;
  const inputRef = useRef<any>(null);

  const channelMappingsArr =
    userChannelMappings?.map((item: any) => {
      return {
        label: item.channelName,
        value: item.channelId,
      };
    }) || [];

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleBackBtnShow = () => {
    let show: any = showBackBtn || showBack;
    if (showBackInNavbar !== null) {
      show = showBackInNavbar;
    }
    return show;
  };

  useEffect(() => {
    const result = handleBackBtnShow();
    setIsShowNav(result);
  }, [showBackBtn, showBack, showBackInNavbar]);

  useEffect(() => {
    dispatch(getUserChannelMappings());
  }, []);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    dispatch(setChannelMapping(value));
    setCurrValue(value);
    setOpenSelect(false);
    dispatch(resetHomeTableData());
    getTableData({ channelid: value, type: productType });
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

  const handleLogoClick = () => {
    router.reload();
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <div className={styles.lhsWrapper}>
          {isShowNav || (
            <div
              className={styles["menu-icon"]}
              onClick={() => handleShowNavbar()}
            >
              <Image src={hamsvg} alt="hamberger" width={20} height={20} />
            </div>
          )}
          <div className={styles.logo}>
            {isShowNav ? (
              <Button
                variant="text"
                color="inherit"
                onClick={() => router.back()}
              >
                <KeyboardBackspaceIcon /> <span>back</span>
              </Button>
            ) : (
              <Image
                style={{ cursor: "pointer" }}
                onClick={() => handleLogoClick()}
                width={150}
                height={100}
                src={logosvg}
                alt="logo"
              />
            )}
          </div>
          <CustomTab
            type={1}
            value={selectedChannel ? productType : ""}
            handleChange={handleChange}
            buttonList={[
              { label: "unapproved products", value: "unAprovedProducts" },
              { label: "approved products", value: "aprovedProducts" },
            ]}
          />
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
                marginLeft: "1rem",
                minWidth: "2rem",
                width: "10rem",
              }}
              selectWrapperStyle={{ padding: "0" }}
              handleOnChange={handleSelectChange}
              label={"Select channel..."}
              data={channelMappingsArr}
            />
          )}
        </div>
        <div className={styles.rhsWrapper}>
          <div className={styles.barcodeIcon}>
            <Image src={barCodeScanIcon} alt="barcode" width={25} height={25} />
          </div>
          <div className={styles.searchIcon}>
            <Image src={searchIcon} alt="search" width={25} height={25} />
          </div>
          <div className={styles.heartIcon}>
            <Image src={heartIcon} alt="liked" width={25} height={25} />
          </div>
          <div className={styles.searchIcon}>
            <Image src={bagIcon} alt="bag" width={25} height={25} />
          </div>
        </div>
        <div
          className={`${styles["nav-elements"]}  ${
            showNavbar && styles.active
          }`}
        >
          <ul>
            <li
              onClick={() => setOpenModal(true)}
              style={{ fontWeight: 600, cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <LogoutModal {...{ openModal, setOpenModal }} />
    </nav>
  );
};

export default Navbar;
