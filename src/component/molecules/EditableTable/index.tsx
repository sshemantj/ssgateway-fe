import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  style?: React.CSSProperties;
  processRowUpdate: ((newRow: any, oldRow: any) => any) | undefined;
}

const EditableTable = (props: IProps) => {
  const { columns, rows, processRowUpdate, style = {} } = props;
  return (
    <DataGrid
      style={style}
      rows={rows}
      columns={columns}
      disableColumnResize
      disableAutosize
      disableColumnMenu
      disableColumnSorting
      processRowUpdate={processRowUpdate}
      hideFooter
    />
  );
};

export default EditableTable;
