import React, { useEffect, useState } from "react";
import ShadowBox from "@/component/atoms/shadowBox";
import toast, { Toaster } from "react-hot-toast";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { Button, Grid, Pagination } from "@mui/material";
import SearchComponent from "@/component/atoms/searchComponent";
import CustomTable from "@/component/molecules/CustomeTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useTableData from "@/hooks/useTableData";
import { useSearchParams } from "next/navigation";
import styles from "./viewPendingAproval.module.scss";
import { approveSizevariants } from "@/services/thunks/tableApis";
import { IFileManagementSubRoutes } from "@/constants/allRoutes";

const VeiwPendingApproval = () => {
  const [open, setOpen] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(100);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");
  const { sizevariantData: apiRes, totalRecords } = useAppSelector(
    (state) => state.gateway.data
  );
  const { pdType } = useAppSelector((state) => state.gateway);

  useEffect(() => {
    getTableData({
      pageSize,
      type: IFileManagementSubRoutes.VIEW_PENDING_APROVAL,
    });
  }, []);

  useEffect(() => {
    if (pdType) {
      setSearch("");
      setCurrSelectedRow([]);
      setPageSize(100);
      // dispatch(resetHomeTableData());
      // getTableData({});
    }
  }, [pdType]);

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
          ...(isAllChecked ? allIds : {}),
        };
      });

      setIsAllChecked((prev) => !prev);
    }
  };

  const handleRowClick = (item: any, index: number) => {
    setOpen((prev: any) => {
      return {
        ...prev,
        [item.id]: prev?.[item.id] ? false : true,
      };
    });

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
  };

  const handlePagination = (pageNumber: number) => {
    getTableData({
      pageNumber,
      searchTerm: search,
      pageSize,
      type: IFileManagementSubRoutes.VIEW_PENDING_APROVAL,
    });
  };

  const handlePageSizeSelection = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(+e.target.value);
  };

  const handleButtonClick = () => {
    const idList = currSelectedRow.map((item) => item.id);
    dispatch(
      approveSizevariants({ payload: idList, source: "FILEUPLOAD" })
    ).then(() => {
      toast.success("Product successfully aproved!", {
        position: "top-right",
        duration: 2000,
      });
      getTableData({
        pageSize,
        type: IFileManagementSubRoutes.VIEW_PENDING_APROVAL,
      });
    });
  };

  return (
    <ShadowBox className={styles.viewPendingApprWrapper}>
      <div className={styles.btnWrapper}>
        <Grid container>
          <Grid item sm={12} md={4} marginLeft={"auto"}></Grid>
          <Grid item sm={12} md={4}>
            <SearchComponent />
          </Grid>
        </Grid>
      </div>
      <div className={styles.tableWrapper}>
        <CustomTable
          handleHeaderClick={handleHeaderClick}
          handleRowClick={handleRowClick}
          open={open}
          theadArr={keysArray}
          tbodyArr={apiRes}
          isMultiSelects
        />
      </div>
      {apiRes?.length ? (
        <div className={styles.submitBtnWrapper}>
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
            <div className={styles.paginationWrapper}>
              <Pagination
                count={Math.ceil(totalRecords / pageSize)}
                onChange={(_, page) => handlePagination(page)}
                variant="outlined"
              />
            </div>
            <Button
              onClick={() => handleButtonClick()}
              className={`${styles.button}`}
              variant="contained"
              disabled={!!!currSelectedRow.length}
            >
              Approve
            </Button>
          </div>
        </div>
      ) : null}
      <Toaster />
    </ShadowBox>
  );
};

export default VeiwPendingApproval;
