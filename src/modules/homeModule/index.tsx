import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ModalComponent from "@/modules/homeModule/modalComponent";
import CustomModal from "@/component/molecules/CustomModal";
import CustomTable from "@/component/molecules/CustomeTable";
import { fetchTableData, getStyleVariants } from "@/services/thunks/tableApis";
import SearchBar from "@/component/molecules/SearchBar";
import {
  resetHomeTableData,
  resetSizeAndStyleVariants,
} from "@/store/slices/gatewaySlice";
import CustomTab from "@/component/atoms/customTab";
import styles from "./customtable.module.scss";

type IProducts = "mappedProducts" | "aprovedProducts";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [currPdId, setCurrPdId] = useState<string>("");
  const [productType, setProductType] = useState<IProducts>();
  const dispatch = useAppDispatch();

  const apiRes = useAppSelector((state) => state.gateway.data.products);
  const pdType = useAppSelector((state) => state.gateway.pdType);
  const keysArray = Object.keys(apiRes?.[0] || {})?.filter(
    (item) => item !== "styleVariants"
  );

  useEffect(() => {
    if (productType) {
      setSearch("");
      dispatch(resetHomeTableData());
      dispatch(fetchTableData({ type: productType }));
    }
  }, [productType]);

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
    dispatch(
      fetchTableData({
        pageNumber,
        searchTerm: search,
        type: productType as IProducts,
      })
    );
  };

  const handleSearchClick = () => {
    dispatch(
      fetchTableData({ searchTerm: search, type: productType as IProducts })
    );
  };

  const handleModalClose = () => {
    dispatch(resetSizeAndStyleVariants());
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.btnWrapper}>
        {pdType === "aprovedProducts" ? (
          <CustomTab
            type={1}
            value={productType}
            setValue={setProductType}
            buttonList={[
              { label: "Mapped", value: "mappedProducts" },
              { label: "Unmapped", value: "aprovedProducts" },
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
      {pdType ? (
        <CustomTable
          handlePagination={handlePagination}
          handleRowClick={handleRowClick}
          open={open}
          theadArr={keysArray}
          tbodyArr={apiRes}
          showPagination
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
