import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ModalComponent from "@/modules/homeModule/modalComponent";
import CustomModal from "@/component/molecules/CustomModal";
import CustomTable from "@/component/molecules/CustomeTable";
import { getStyleVariants } from "@/services/thunks/tableApis";
import SearchBar from "@/component/molecules/SearchBar";
import {
  IProducts,
  changePdType,
  resetHomeTableData,
  resetSizeAndStyleVariants,
} from "@/store/slices/gatewaySlice";
import CustomTab from "@/component/atoms/customTab";
import styles from "./customtable.module.scss";
import useTableData from "@/hooks/useTableData";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [currPdId, setCurrPdId] = useState<string>("");
  const [productType, setProductType] = useState<IProducts>();
  const dispatch = useAppDispatch();
  const getTableData = useTableData();

  const { products: apiRes, totalRecords } = useAppSelector(
    (state) => state.gateway.data
  );
  const { pdType } = useAppSelector((state) => state.gateway);

  const keysArray =
    apiRes && apiRes?.length
      ? [
          "code",
          "stylecode",
          "styledesc",
          "brandcode",
          "description",
          "material",
        ]
      : [];

  useEffect(() => {
    if (pdType) {
      setSearch("");
      dispatch(resetHomeTableData());
      getTableData({});
    }
  }, [pdType]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleRowClick = (item: any, index: number) => {
    setOpen((prev: any) => {
      return {
        [index]: prev[index] ? false : true,
      };
    });
    setCurrPdId(item.id);
    dispatch(getStyleVariants({ productid: item.id }))
      .unwrap()
      .then(() => {
        handleModalOpen();
      });
  };

  const handlePagination = (pageNumber: number) => {
    getTableData({
      pageNumber,
      searchTerm: search,
    });
  };

  const handleSearchClick = () => {
    getTableData({
      searchTerm: search,
    });
  };

  const handleModalClose = () => {
    dispatch(resetSizeAndStyleVariants());
  };

  const showTableConditions = (): boolean => {
    if (pdType === "unAprovedProducts") {
      return true;
    } else if (!!productType) {
      return true;
    }
    return false;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setProductType(newValue);
    dispatch(changePdType(newValue));
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.btnWrapper}>
        {pdType !== "unAprovedProducts" ? (
          <CustomTab
            type={1}
            value={pdType}
            handleChange={handleChange}
            buttonList={[
              { label: "Unmapped", value: "aprovedProducts" },
              { label: "Mapped", value: "mappedProducts" },
            ]}
          />
        ) : null}
        {productType && (
          <div className={styles.searchContainer}>
            <SearchBar
              handleSearchClick={handleSearchClick}
              value={search}
              setSearch={setSearch}
            />
          </div>
        )}
      </div>
      {showTableConditions() ? (
        <CustomTable
          handlePagination={handlePagination}
          handleRowClick={handleRowClick}
          open={open}
          theadArr={keysArray}
          tbodyArr={apiRes}
          showPagination
          totalRecords={totalRecords}
        />
      ) : null}
      <CustomModal
        closeIconStyle={{ top: "1rem", right: "1rem" }}
        open={openModal}
        setOpen={setOpenModal}
        handleModalClose={handleModalClose}
      >
        <ModalComponent {...{ currPdId }} />
      </CustomModal>
    </div>
  );
};

export default HomeModule;
