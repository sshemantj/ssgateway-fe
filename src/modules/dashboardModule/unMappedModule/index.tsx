import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { inProgressColumns, inProgressRows } from "@/constants/tableConstant";
import UnMappedFooter from "./unMappFooter";

interface IProps {
  handlePostChannnelMapping: () => void;
}

const UnMappedModule = (props: IProps) => {
  const { handlePostChannnelMapping } = props;
  const [tableState, setTableState] = useState({
    columns: inProgressColumns,
    rows: inProgressRows,
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
          slots: { footer: UnMappedFooter(handlePostChannnelMapping) },
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
        }}
      />
    </Box>
  );
};

export default UnMappedModule;
