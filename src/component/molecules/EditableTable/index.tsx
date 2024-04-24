import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const EditableTable = (props: IProps) => {
  const { columns, rows } = props;
  return <DataGrid style={{ height: 300 }} rows={rows} columns={columns} />;
};

export default EditableTable;
