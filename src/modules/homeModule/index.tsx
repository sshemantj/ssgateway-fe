import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ModalComponent from "@/modules/homeModule/modalComponent";
import CustomModal from "@/component/molecules/CustomModal";
import CustomTable from "@/component/molecules/CustomeTable";
import { fetchTableData, getStyleVariants } from "@/services/thunks/tableApis";
import SearchBar from "@/component/molecules/SearchBar";
import { resetSizeAndStyleVariants } from "@/store/slices/gatewaySlice";
import CustomTab from "@/component/atoms/customTab";
import styles from "./customtable.module.scss";

const DemoModule = () => {
  const [open, setOpen] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [currPdId, setCurrPdId] = useState<string>("");
  const [currButton, setCurrButton] = useState<string>("");
  const dispatch = useAppDispatch();

  const apiRes = useAppSelector((state) => state.gateway.data.products);
  const keysArray = Object.keys(apiRes?.[0] || {})?.filter(
    (item) => item !== "styleVariants"
  );
  // console.log(apiRes);

  useEffect(() => {
    dispatch(fetchTableData({}));
  }, []);

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
    dispatch(fetchTableData({ pageNumber, searchTerm: search }));
  };

  const handleSearchClick = () => {
    dispatch(fetchTableData({ searchTerm: search }));
  };

  const handleModalClose = () => {
    dispatch(resetSizeAndStyleVariants());
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.btnWrapper}>
        <CustomTab
          {...{ ...{ value: currButton, setValue: setCurrButton } }}
          buttonList={["Mapped", "Unmapped"]}
        />
        <div className={styles.searchContainer}>
          <SearchBar
            handleSearchClick={handleSearchClick}
            value={search}
            setSearch={setSearch}
          />
        </div>
      </div>
      <CustomTable
        handlePagination={handlePagination}
        handleRowClick={handleRowClick}
        open={open}
        theadArr={keysArray}
        tbodyArr={apiRes}
        showPagination
      />
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

export default DemoModule;
