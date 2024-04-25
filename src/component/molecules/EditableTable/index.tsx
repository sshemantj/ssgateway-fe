import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  processRowUpdate: ((newRow: any, oldRow: any) => any) | undefined;
}

const EditableTable = (props: IProps) => {
  const { columns, rows, processRowUpdate } = props;
  return (
    <DataGrid
      style={{ height: 300 }}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
    />
  );
};

export default EditableTable;
