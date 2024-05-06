import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { channelColumns } from "@/constants/channelCommon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./viewAllChannel.module.scss";
import { getChannelMasters } from "@/services/thunks/tableApis";

const ViewAllChannel = () => {
  const [tableRows, setTableRows] = useState<GridRowsProp>();
  const [tableColumns, setTableColumns] = useState<GridColDef[]>();
  const { channelMasters } = useAppSelector((state) => state.gateway);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChannelMasters());
  }, []);

  useEffect(() => {
    const finalTableColumns = Array.isArray(channelMasters)
      ? channelMasters.map(
          ({ id, channelid, channelname, description, isactive }) => {
            return {
              id,
              channelid,
              channelname,
              description,
              // isactive,
            };
          }
        )
      : [];
    setTableRows(finalTableColumns);

    const deepCopiedColumns = JSON.parse(JSON.stringify(channelColumns));

    const updatedColumns = deepCopiedColumns.map((item: any) => {
      item.editable = false;
      return item;
    });
    setTableColumns(updatedColumns);
  }, [channelMasters]);

  return (
    <div className={styles.viewAllChannel_wrapper}>
      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <Typography variant="h4">View all channels</Typography>
      </Box>
      {tableRows && tableColumns ? (
        <DataGrid
          style={{ maxHeight: 300 }}
          rows={tableRows}
          columns={tableColumns}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          hideFooter
        />
      ) : null}
    </div>
  );
};

export default ViewAllChannel;
