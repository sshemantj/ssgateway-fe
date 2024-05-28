import React, { useEffect, useState } from "react";
import { unApprovedColumns, unApprovedRows } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import UnApprovedFooter from "./unApprovedFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { approveSizevariants } from "@/services/thunks/tableApis";
import toast, { Toaster } from "react-hot-toast";
import useTableData from "@/hooks/useTableData";

interface IProps {}

const UnapprovedModule = (props: IProps) => {
  const {} = props;

  const unAprovedProducts = useAppSelector(
    (state) => state.gateway.unAprovedProducts
  );
  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const [tableState, setTableState] = useState({
    columns: unApprovedColumns,
    rows: [],
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
          slots: {
            footer: UnApprovedFooter(
              handleApprovedProduct,
              !!!selectedTableRows?.length
            ),
          },
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
          rowCount: unAprovedProducts?.totalRecords,
        }}
      />
      <Toaster />
    </Box>
  );
};

export default UnapprovedModule;
