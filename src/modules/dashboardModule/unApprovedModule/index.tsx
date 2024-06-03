import React, { useEffect, useState } from "react";
import { unApprovedColumns, unApprovedRows } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import {
  GridCallbackDetails,
  GridPaginationModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import UnApprovedFooter from "./unApprovedFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  approveSizevariants,
  fetchTableData,
} from "@/services/thunks/tableApis";
import toast, { Toaster } from "react-hot-toast";
import useTableData from "@/hooks/useTableData";
import { IProductsTypes } from "@/interfaces/product";

interface IProps {}

const UnapprovedModule = (props: IProps) => {
  const {} = props;

  const unAprovedProducts = useAppSelector(
    (state) => state.gateway.unAprovedProducts
  );
  const { selectedChannel } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();
  const getTableData = useTableData();

  const [tableState, setTableState] = useState({
    columns: unApprovedColumns,
    rows: [],
    isLoading: false,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (unAprovedProducts?.sizevariantData?.length) {
      const data = unAprovedProducts?.sizevariantData;
      const newRows = data?.map((item: (typeof unApprovedRows)[0]) => ({
        id: item.id,
        code: item.code,
        baseproduct: item.baseproduct,
        sizecode: item.sizecode,
        sizedesc: item.sizedesc,
        stylecode: item.stylecode,
        subdepartmentcode: item.subdepartmentcode,
      }));

      setTableState((prev) => {
        return {
          ...prev,
          rows: newRows,
        };
      });
    }
  }, [unAprovedProducts]);

  useEffect(() => {
    setTableState((old) => ({ ...old, isLoading: true }));
    dispatch(
      fetchTableData({
        channelid: selectedChannel,
        pageNumber: tableState.page,
        pageSize: tableState.pageSize,
        type: IProductsTypes.UNAPPROVED,
      })
    ).then(() => {
      setTableState((old) => ({
        ...old,
        isLoading: false,
      }));
    });
  }, [tableState.page, tableState.pageSize]);

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const handleApprovedProduct = () => {
    if (selectedTableRows?.length) {
      dispatch(
        approveSizevariants({
          payload: selectedTableRows as string[],
          source: "UI",
        })
      ).then(() => {
        toast.success("Product successfully aproved!", {
          position: "top-right",
          duration: 2000,
        });
        getTableData({
          pageSize: 100,
        });
      });
    }
  };

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  return (
    <Box width="100%">
      <FeaturedTable
        {...{
          loading: tableState.isLoading,
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
          rowCount: unAprovedProducts?.totalRecords,
          paginationMode: "server",
          // paginationModel: {
          //   page: tableState.page - 1,
          //   pageSize: tableState.pageSize,
          // },
          onPaginationModelChange: ({
            page,
            pageSize,
          }: GridPaginationModel) => {
            console.log({ page, pageSize });
            setTableState((old) => ({ ...old, page, pageSize }));
          },
          slots: {
            footer: () => (
              <UnApprovedFooter
                {...{
                  handleApprovedProduct,
                  isDisabled: !!!selectedTableRows?.length,
                }}
              />
            ),
          },
        }}
      />
      <Toaster />
    </Box>
  );
};

export default UnapprovedModule;
