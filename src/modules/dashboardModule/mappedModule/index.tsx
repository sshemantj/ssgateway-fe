import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { inProgressColumns, inProgressRows } from "@/constants/tableConstant";

const MappedModule = () => {
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
    <Box width="100%" maxWidth="80vw">
      <FeaturedTable
        {...{
          rows: tableState.rows,
          columns: tableState.columns,
          checkboxSelection: true,
          onRowSelectionModelChange,
        }}
      />
    </Box>
  );
};

export default MappedModule;
