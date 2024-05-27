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
  IProducts,
  changePdType,
  changeSubPdType,
  resetHomeTableData,
} from "@/store/slices/gatewaySlice";
import useTableData from "@/hooks/useTableData";
import { Box, Button, Grid, Pagination } from "@mui/material";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import DoubleVariantCard from "@/component/atoms/cards/doubleVariantCard";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import toast, { Toaster } from "react-hot-toast";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { useSearchParams } from "next/navigation";
import SelectDropdown from "@/component/molecules/selectDropdown";
import SearchComponent from "@/component/atoms/searchComponent";
import styles from "./customtable.module.scss";
import UnapprovedModule from "./unapprovedModule";

const HomeModule = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(100);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);
  const [selectedCatlog, setselectedCatlog] = useState<string>("");
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
      setPageSize(100);
      setselectedChannels({});
      // dispatch(resetHomeTableData());
      // getTableData({});
    }
  }, [pdType, subPdType]);

  useEffect(() => {
    if (pdType === IProductsTypes.APPROVED) {
      dispatch(getCountApi({ type: "unmapped", channelid: selectedChannel }))
        .unwrap()
        .then((res) => {
          setTotalCount((prev) => ({
            ...prev,
            unmapped: res?.totalCount,
          }));
        });

      dispatch(getCountApi({ type: "mapped", channelid: selectedChannel }))
        .unwrap()
        .then((res) => {
          setTotalCount((prev) => ({
            ...prev,
            mapped: res?.totalCount,
          }));
        });
    }
  }, [pdType, selectedChannel]);

  useEffect(() => {
    getTableData({ pageSize, type: productType as IProducts });
  }, [pageSize]);

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
      pageSize,
    });
  };

  const handleChange = (_: React.SyntheticEvent, newValue: any) => {
    setProductType(newValue);
    dispatch(changeSubPdType(newValue));
    dispatch(
      fetchTableData({ channelid: selectedChannel, type: newValue })
    ).catch((error) => console.log(error));
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
          channelid: currChannel?.channelId,
          channelname: currChannel?.channelName,
          stylecode: item.stylecode,
          StyleVariantCode: item.baseproduct,
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
          channelid: "",
          channelname: "",
          stylecode: item.stylecode,
          StyleVariantCode: item.baseproduct,
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
    dispatch(approveSizevariants({ payload: idList, source: "UI" })).then(
      () => {
        toast.success("Product successfully aproved!", {
          position: "top-right",
          duration: 2000,
        });
        getTableData({
          pageSize,
        });
      }
    );
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

  const handlePageSizeSelection = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(+e.target.value);
  };

  const handleCatlogSelect = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setselectedCatlog(e.target.value);
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.btnWrapper}>
        <Grid container>
          <Grid item sm={12} md={4}>
            {subPdType === IApprovedPdTypes.MAPPED ? (
              <Box className={styles.catlogSelect}>
                <SelectDropdown
                  handleOnChange={handleCatlogSelect}
                  label="Select Catlog"
                  value={selectedCatlog}
                  inputProps={{
                    sx: {
                      padding: "6px 0 6px 2.6rem",
                      textAlign: "start",
                    },
                  }}
                  selectSx={{
                    width: "12rem",
                    "& .MuiInputBase-input": {
                      padding: "5px",
                    },
                    "& fieldset legend": {
                      display: "none",
                    },
                    "& label": {
                      top: "-10px",
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "-4px",
                      background: "#fff",
                    },
                  }}
                  data={[
                    { label: "Catlog", value: "catlog" },
                    { label: "Not catlogs", value: "notcatlogs" },
                    { label: "Live", value: "live" },
                    { label: "Not live", value: "notlive" },
                  ]}
                />
              </Box>
            ) : null}
          </Grid>
          <Grid item sm={12} md={4} marginLeft={"auto"}>
            {pdType !== IProductsTypes.UNAPPROVED ? (
              <DoubleVariantCard
                handleChange={handleChange}
                mappedCount={totalCount?.mapped as number}
                unMappedCount={totalCount?.unmapped as number}
                color="primary"
              />
            ) : null}
          </Grid>
          <Grid item sm={12} md={4}>
            {pdType && <SearchComponent />}
          </Grid>
        </Grid>
      </div>
      <div className={styles.tableWrapper}>
        <UnapprovedModule />
        {/* <CustomTable
          handleHeaderClick={handleHeaderClick}
          handleRowClick={handleRowClick}
          open={open?.[productType]}
          theadArr={keysArray}
          tbodyArr={apiRes}
          isMultiSelects={pdType !== IApprovedPdTypes.MAPPED}
          selectedChannels={selectedChannels}
        /> */}
      </div>
      {/* {subPdType !== IApprovedPdTypes.MAPPED && apiRes?.length ? ( */}
      {/* <div className={styles.submitBtnWrapper}>
        <div className={styles.rhs_wrapper}>
          <div className={styles.totalRecordWrapper}>
            <p>Total records: {totalRecords}</p>
          </div>
          <SelectDropdown
            handleOnChange={handlePageSizeSelection}
            label="Rows per page"
            value={pageSize}
            inputProps={{
              sx: {
                padding: "6px 0 6px 2.6rem",
                textAlign: "start",
              },
            }}
            selectSx={{ width: "6rem" }}
            data={[
              { label: "100", value: 100 },
              { label: "50", value: 50 },
              { label: "30", value: 30 },
              { label: "10", value: 10 },
            ]}
          />
        </div>
        <div className={styles.lhs_wrapper}>
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
          <div className={styles.paginationWrapper}>
            <Pagination
              count={Math.ceil(totalRecords / pageSize)}
              onChange={(_, page) => handlePagination(page)}
              variant="outlined"
            />
          </div>
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
        </div>
      </div> */}
      {/* ) : null} */}
      <Toaster />
    </div>
  );
};

export default HomeModule;
