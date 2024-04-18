import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomTable from "@/component/molecules/CustomeTable";
import {
  IPostChannelMapping,
  getStyleVariants,
  postChannelMapping,
} from "@/services/thunks/tableApis";
import { changePdType, resetHomeTableData } from "@/store/slices/gatewaySlice";
import CustomTab from "@/component/atoms/customTab";
import useTableData from "@/hooks/useTableData";
import { Button } from "@mui/material";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import styles from "./customtable.module.scss";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [currChannel, setCurrChannel] = useState<any>("");
  const [productType, setProductType] = useState<string>("");
  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const isMobile = useMobileCheck();

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
        [productType]: {
          ...prev?.[productType],
          [item.id]: prev?.[productType]?.[item.id] ? false : true,
        },
      };
    });

    if (pdType !== "mappedProducts") {
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
    }
  };

  const handlePagination = (pageNumber: number) => {
    getTableData({
      pageNumber,
      searchTerm: search,
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setProductType(newValue);
    dispatch(changePdType(newValue));
  };

  const showBtnText = () => {
    switch (pdType) {
      case "aprovedProducts":
        return `Mapped with ${currChannel?.channelName}`;

      case "mappedProducts":
        break;

      case "unAprovedProducts":
        return `Approve`;
    }
  };

  const handlePostChannnelMapping = () => {
    const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
      return {
        productid: item.productid,
        stylevariantid: item.stylevariantid,
        channelid: currChannel?.channelId,
        channelname: currChannel?.channelName,
        sizevariantid: item.id,
        sizevariantcode: item.code,
      };
    });

    dispatch(postChannelMapping(payload));
  };

  const handleButtonClick = () => {
    switch (pdType) {
      case "aprovedProducts":
        handlePostChannnelMapping();
        break;
      case "unAprovedProducts":
        break;
    }
  };

  useEffect(() => {
    if (selectedChannel) {
      const currChannel = userChannelMappings?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel);
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
          open={open?.[productType]}
          theadArr={keysArray}
          tbodyArr={apiRes}
          showPagination
          totalRecords={totalRecords}
          isMultiSelects={pdType !== "mappedProducts"}
          selectedChannels={selectedChannels}
        />
      </div>
      {pdType !== "mappedProducts" && (
        <div className={styles.submitBtnWrapper}>
          <Button
            onClick={() => handleButtonClick()}
            className={styles.button}
            variant="contained"
            disabled={!!!currSelectedRow.length}
          >
            {showBtnText()}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomeModule;
