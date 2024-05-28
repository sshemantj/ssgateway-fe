import React, { useEffect, useState } from "react";
import {
  pendingApprovalColumns,
  pendingApprovalRows,
} from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { approveSizevariants } from "@/services/thunks/tableApis";
import toast, { Toaster } from "react-hot-toast";
import useTableData from "@/hooks/useTableData";
import ViewPendingFooter from "./viewPendingFooter";

interface IProps {}

const ViewPendingTable = (props: IProps) => {
  const {} = props;

  const viewPendingApproval = useAppSelector(
    (state) => state.gateway["view-pending-approval"]
  );
  const dispatch = useAppDispatch();
  const getTableData = useTableData();
  const [tableState, setTableState] = useState({
    columns: pendingApprovalColumns,
    rows: [],
  });

  useEffect(() => {
    if (viewPendingApproval?.sizevariantData?.length) {
      const data = viewPendingApproval?.sizevariantData;
      const newRows = data?.map((item: (typeof pendingApprovalRows)[0]) => ({
        id: item.id,
        code: item.code,
        baseProduct: item.baseProduct,
        sizeCode: item.sizeCode,
        sizeDesc: item.sizeDesc,
        styleCode: item.styleCode,
        subDepartmentCode: item.subDepartmentCode,
      }));

      setTableState((prev) => {
        return {
          ...prev,
          rows: newRows,
        };
      });
    }
  }, [viewPendingApproval]);

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
            footer: ViewPendingFooter(
              handleApprovedProduct,
              !!!selectedTableRows?.length
            ),
          },
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
        }}
      />
      <Toaster />
    </Box>
  );
};

export default ViewPendingTable;