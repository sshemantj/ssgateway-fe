import React, { useEffect, useState } from "react";
import { unApprovedColumns, unApprovedRows } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import UnApprovedFooter from "./unApprovedFooter";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  handleApprovedProduct: () => void;
}

const UnapprovedModule = (props: IProps) => {
  const { handleApprovedProduct } = props;

  const unAprovedProducts = useAppSelector(
    (state) => state.gateway.unAprovedProducts
  );

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

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  return (
    <Box width="100%">
      <FeaturedTable
        {...{
          slots: {
            footer: UnApprovedFooter(handleApprovedProduct),
          },
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
        }}
      />
    </Box>
  );
};

export default UnapprovedModule;
