import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentProduct } from "@/store/slices/gatewaySlice";
import styles from "./customtable.module.scss";
import ModalComponent from "@/modules/demoModule/modalComponent";
import CustomModal from "@/component/molecules/CustomModal";
import CustomTable from "@/component/molecules/CustomeTable";
import { fetchTableData } from "@/services/thunks/tableApis";

const DemoModule = () => {
  const [open, setOpen] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const apiRes = useAppSelector((state) => state.gateway.value.products);
  const keysArray = Object.keys(apiRes?.[0])?.filter(
    (item) => item !== "styleVariants"
  );
  // console.log(apiRes);

  useEffect(() => {
    dispatch(fetchTableData(1));
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleRowClick = (item: any, index: number) => {
    dispatch(setCurrentProduct(item));
    setOpen((prev: any) => {
      return {
        [index]: prev[index] ? false : true,
      };
    });
    handleModalOpen();
  };

  const handlePagination = (pageNumber: number) => {
    dispatch(fetchTableData(pageNumber));
  };

  return (
    <div className={styles.customTableWrapper}>
      <CustomTable
        handlePagination={handlePagination}
        handleRowClick={handleRowClick}
        open={open}
        theadArr={keysArray}
        tbodyArr={apiRes}
      />
      <CustomModal
        closeIconStyle={{ top: "1rem", right: "1rem" }}
        open={openModal}
        setOpen={setOpenModal}
      >
        <ModalComponent />
      </CustomModal>
    </div>
  );
};

export default DemoModule;
