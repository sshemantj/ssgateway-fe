import React from "react";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  gridClasses,
} from "@mui/x-data-grid";

export interface IFeaturedTableProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  tableStyleWrapper?: React.CSSProperties;
}

const FeaturedTable = (props: IFeaturedTableProps) => {
  const {
    columns,
    rows,
    processRowUpdate,
    tableStyleWrapper = {},
    onRowSelectionModelChange,
    ...rest
  } = props;

  return (
    <div style={{ height: 400, width: "100%", ...tableStyleWrapper }}>
      <DataGrid
        sx={{
          "@media(min-width: 768px)": {
            maxWidth: "calc(100vw - 110px)",
          },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
          "& .MuiDataGrid-scrollbar--vertical::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-scrollbar--vertical::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "& .MuiDataGrid-scrollbar--vertical::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "& .MuiDataGrid-scrollbar--vertical::-webkit-scrollbar-thumb:hover": {
            background: "#555",
            cursor: "grab",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={onRowSelectionModelChange}
        pageSizeOptions={[10, 30, 50, 100]}
        disableColumnResize
        {...rest}
      />
    </div>
  );
};

export default FeaturedTable;
