import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomTable from "@/component/molecules/CustomeTable";
import {
  IPostChannelMapping,
  approveSizevariants,
  fetchTableData,
  getCountApi,
  postChannelMapping,
} from "@/services/thunks/tableApis";
import {
  changePdType,
  changeSubPdType,
  resetHomeTableData,
} from "@/store/slices/gatewaySlice";
import useTableData from "@/hooks/useTableData";
import { Button, Grid } from "@mui/material";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import DoubleVariantCard from "@/component/atoms/cards/doubleVariantCard";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import styles from "./customtable.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { useSearchParams } from "next/navigation";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);
  const [currChannel, setCurrChannel] = useState<any>("");
  const [productType, setProductType] = useState<string>("");
  const [totalCount, setTotalCount] = useState<{
    mapped: number | null;
    unmapped: number | null;
  }>({
    mapped: null,
    unmapped: null,
  });
  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");
  const isMobile = useMobileCheck();

  const { sizevariantData: apiRes, totalRecords } = useAppSelector(
    (state) => state.gateway.data
  );
  const { pdType, selectedChannel, subPdType } = useAppSelector(
    (state) => state.gateway
  );
  const userChannel = useAppSelector(
    (state) => state.gateway.userChannelMappings
  );
  const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];

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
    if (screen) {
      setProductType(screen);
    }
  }, [screen]);

  useEffect(() => {
    if (pdType) {
      setSearch("");
      setCurrSelectedRow([]);
      // dispatch(resetHomeTableData());
      // getTableData({});
    }
  }, [pdType, subPdType]);

  useEffect(() => {
    if (pdType === IProductsTypes.APPROVED) {
      dispatch(getCountApi({ type: "unmapped" }))
        .unwrap()
        .then((res) => {
          setTotalCount((prev) => ({
            ...prev,
            unmapped: res.totalCount,
          }));
        });

      dispatch(getCountApi({ type: "mapped" }))
        .unwrap()
        .then((res) => {
          setTotalCount((prev) => ({
            ...prev,
            mapped: res.totalCount,
          }));
        });
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

    if (pdType !== IApprovedPdTypes.MAPPED) {
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
    dispatch(changeSubPdType(newValue));
    dispatch(fetchTableData({ channelid: selectedChannel, type: newValue }));
    // dispatch(changePdType(newValue));
  };

  const showBtnText = () => {
    switch (pdType) {
      case IApprovedPdTypes.UN_MAPPED:
        return `Map channels`;

      case IApprovedPdTypes.MAPPED:
        break;

      case IProductsTypes.UNAPPROVED:
        return `Approve`;
    }
  };

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
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(
          fetchTableData({ channelid: selectedChannel, type: subPdType })
        );
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
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(
          fetchTableData({ channelid: selectedChannel, type: subPdType })
        );
      });
    }
  };

  const handleApprovedProduct = () => {
    const idList = currSelectedRow.map((item) => item.id);
    dispatch(approveSizevariants(idList)).then(() => {
      toast.success("Product successfully aproved!", {
        position: "top-right",
        duration: 2000,
      });
      getTableData({});
    });
  };

  const handleButtonClick = () => {
    switch (pdType) {
      case IApprovedPdTypes.UN_MAPPED:
        handlePostChannnelMapping();
        break;
      case IProductsTypes.UNAPPROVED:
        handleApprovedProduct();
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

      setCurrSelectedRow(isAllChecked ? apiRes : []);

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
      {pdType !== IProductsTypes.UNAPPROVED ? (
        <div className={styles.btnWrapper}>
          <Grid container>
            <Grid sm={12} md={4} item margin={"auto"}>
              <DoubleVariantCard
                handleChange={handleChange}
                mappedCount={totalCount?.mapped as number}
                unMappedCount={totalCount?.unmapped as number}
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
          isMultiSelects={pdType !== IApprovedPdTypes.MAPPED}
          selectedChannels={selectedChannels}
        />
      </div>
      {pdType !== IApprovedPdTypes.MAPPED && (
        <div className={styles.submitBtnWrapper}>
          <Button
            onClick={() => handleButtonClick()}
            className={`${styles.button} ${
              pdType !== IApprovedPdTypes.UN_MAPPED && styles.position
            }`}
            variant="contained"
            disabled={!!!currSelectedRow.length}
          >
            {showBtnText()}
          </Button>
          {pdType === IApprovedPdTypes.UN_MAPPED && (
            <MultiSelectDropdown
              {...{
                setselectedChannels,
                selectedChannels,
                index: 0,
                currChannel: currChannel?.channelId || "",
              }}
            />
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default HomeModule;
