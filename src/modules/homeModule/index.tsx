import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomTable from "@/component/molecules/CustomeTable";
import { getStyleVariants } from "@/services/thunks/tableApis";
import { changePdType, resetHomeTableData } from "@/store/slices/gatewaySlice";
import CustomTab from "@/component/atoms/customTab";
import useTableData from "@/hooks/useTableData";
import { Button } from "@mui/material";
import styles from "./customtable.module.scss";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [currChannel, setCurrChannel] = useState<string>("");
  const dispatch = useAppDispatch();
  const getTableData = useTableData();

  const { sizevariantData: apiRes, totalRecords } = useAppSelector(
    (state) => state.gateway.data
  );
  const { pdType, selectedChannel, userChannelMappings } = useAppSelector(
    (state) => state.gateway
  );

  const keysArray =
    apiRes && apiRes?.length
      ? [
          "code",
          "baseproduct",
          "sizecode",
          "sizedesc",
          "stylecode",
          "subdepartmentcode",
        ]
      : [];

  useEffect(() => {
    if (pdType) {
      setSearch("");
      dispatch(resetHomeTableData());
      getTableData({});
    }
  }, [pdType]);

  const handleRowClick = (item: any, index: number) => {
    setOpen((prev: any) => {
      return {
        ...prev,
        [index]: prev[index] ? false : true,
      };
    });
    // setCurrPdId(item.id);
    setCurrSelectedRow((prev) => {
      if (!Array.isArray(prev)) return [];

      const data = prev.find((prevItem) => {
        return prevItem.id === item.id;
      });

      if (!data) {
        prev = [...prev, item];
      } else {
        prev = prev.filter((prevItem) => {
          return prevItem.id !== item.id;
        });
      }

      return prev;
    });

    dispatch(getStyleVariants({ productid: item.id }));
  };

  const handlePagination = (pageNumber: number) => {
    getTableData({
      pageNumber,
      searchTerm: search,
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    // setProductType(newValue);
    dispatch(changePdType(newValue));
  };

  const showBtnText = () => {
    switch (pdType) {
      case "aprovedProducts":
        return `Mapped with ${currChannel}`;

      case "mappedProducts":
        break;

      case "unAprovedProducts":
        return `Approve`;
    }
  };

  useEffect(() => {
    if (selectedChannel) {
      const currChannel = userChannelMappings?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel?.channelName || "");
    }
  }, [selectedChannel]);

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
      </div>
      <div className={styles.tableWrapper}>
        <CustomTable
          handlePagination={handlePagination}
          handleRowClick={handleRowClick}
          open={open}
          theadArr={keysArray}
          tbodyArr={apiRes}
          showPagination
          totalRecords={totalRecords}
          isMultiSelects
          allCheckBox={open}
          setselectedChannels={setselectedChannels}
          selectedChannels={selectedChannels}
        />
      </div>
      <div className={styles.submitBtnWrapper}>
        <Button className={styles.button} variant="contained">
          {showBtnText()}
        </Button>
      </div>
      {/* <CustomModal
        closeIconStyle={{ top: "2rem", right: "3rem" }}
        open={openModal}
        setOpen={setOpenModal}
        handleModalClose={handleModalClose}
      >
        <ModalComponent {...{ currPdId }} />
      </CustomModal> */}
    </div>
  );
};

export default HomeModule;
