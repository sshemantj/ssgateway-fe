import React, { useState } from "react";
import {
  carrierCollectionsColumns,
  carrierCollectionsRows,
} from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import UnApprovedFooter from "./unApprovedFooter";

interface IProps {
  handleApprovedProduct: () => void;
}

const UnapprovedModule = (props: IProps) => {
  const { handleApprovedProduct } = props;
  const [tableState, setTableState] = useState({
    columns: carrierCollectionsColumns,
    rows: carrierCollectionsRows,
  });

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
