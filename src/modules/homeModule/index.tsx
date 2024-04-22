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
import { Button, Grid } from "@mui/material";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import DoubleVariantCard from "@/component/atoms/cards/doubleVariantCard";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import styles from "./customtable.module.scss";
import { ToastContainer, toast } from "react-toastify";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);
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

  const handleChange = (newValue: any) => {
    setProductType(newValue);
    dispatch(changePdType(newValue));
  };

  // const showBtnText = () => {
  //   switch (pdType) {
  //     case "aprovedProducts":
  //       return `Mapped with ${currChannel?.channelName}`;

  //     case "mappedProducts":
  //       break;

  //     case "unAprovedProducts":
  //       return `Approve`;
  //   }
  // };

  const handlePostChannnelMapping = () => {
    if (!selectedChannels?.[0]) {
      //handle single channel mappings
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
      dispatch(postChannelMapping(payload)).then(() => {
        toast.success("Channel mapping successful!");
      });
    } else {
      //handle multiple channel mappings
      const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
        return {
          productid: item.productid,
          stylevariantid: item.stylevariantid,
          channelid: "",
          channelname: "",
          sizevariantid: item.id,
          sizevariantcode: item.code,
        };
      });

      const allSelectedChannels =
        userChannelMappings
          ?.filter((item: any) =>
            selectedChannels?.[0].value?.includes(item.channelId)
          )
          ?.map((item: any) => ({
            channelid: item?.channelId,
            channelname: item?.channelName,
          })) || [];

      const combinedData = payload.flatMap((item2) =>
        allSelectedChannels.map((item1: any) => {
          return { ...item2, ...item1 };
        })
      );

      dispatch(postChannelMapping(combinedData)).then(() => {
        toast.success("Channel mapping successful!");
      });
    }
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

  const handleHeaderClick = (name: string) => {
    if (name === "check") {
      const allIds = apiRes?.reduce((acc: any, curr: any) => {
        acc[curr.id] = true;
        return acc;
      }, {});

      setCurrSelectedRow(apiRes);

      setOpen((prev: any) => {
        return {
          ...prev,
          [productType]: isAllChecked ? allIds : {},
        };
      });

      setIsAllChecked((prev) => !prev);
    }
  };

  return (
    <div className={styles.customTableWrapper}>
      {pdType !== "unAprovedProducts" ? (
        <div className={styles.btnWrapper}>
          <Grid container>
            <Grid sm={12} md={4} item margin={"auto"}>
              <DoubleVariantCard
                handleChange={handleChange}
                mappedCount={221}
                unMappedCount={544}
                color="primary"
              />
            </Grid>
          </Grid>
        </div>
      ) : null}
      <div className={styles.tableWrapper}>
        <CustomTable
          handlePagination={handlePagination}
          handleHeaderClick={handleHeaderClick}
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
            Mapp channels
          </Button>
          <MultiSelectDropdown
            {...{
              setselectedChannels,
              selectedChannels,
              index: 0,
              currChannel: currChannel?.channelId || "",
            }}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default HomeModule;
