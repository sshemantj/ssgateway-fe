import React, { useEffect, useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { mappedColumn, mappedRows } from "@/constants/tableConstant";
import MappedFooter from "./mappedModule";
import { useAppSelector } from "@/store/hooks";

const MappedModule = () => {
  const [tableState, setTableState] = useState({
    columns: mappedColumn,
    rows: [],
  });

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const mappedProducts = useAppSelector(
    (state) => state.gateway.mappedProducts
  );

  useEffect(() => {
    if (mappedProducts?.sizevariantData?.length) {
      const data = mappedProducts?.sizevariantData;
      const newRows = data?.map((item: (typeof mappedRows)[0]) => ({
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
  }, [mappedProducts]);

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  const handleMappProduct = () => {
    console.log(selectedTableRows);
  };

  return (
    <Box width="100%">
      <FeaturedTable
        {...{
          slots: {
            footer: MappedFooter(
              handleMappProduct,
              !!!selectedTableRows?.length
            ),
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

export default MappedModule;
