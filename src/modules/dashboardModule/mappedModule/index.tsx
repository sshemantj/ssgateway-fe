import React, { useEffect, useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { mappedColumn, mappedRows } from "@/constants/tableConstant";
import MappedFooter from "./mappedModule";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  IPostChannelUnMapping,
  fetchTableData,
  postChannelUnMapping,
} from "@/services/thunks/tableApis";
import toast, { Toaster } from "react-hot-toast";

const MappedModule = () => {
  const [tableState, setTableState] = useState({
    columns: mappedColumn,
    rows: [],
  });
  const [currChannel, setCurrChannel] = useState<any>("");
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const mappedProducts = useAppSelector(
    (state) => state.gateway.mappedProducts
  );
  const {
    selectedChannel,
    subPdType,
    // aprovedProducts: unMappedProducts,
    userChannelMappings: userChannel,
  } = useAppSelector((state) => state.gateway);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedChannel) {
      const currChannel = userChannel?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel);
    }
  }, [selectedChannel, userChannel]);

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
    const currSelectedRows = mappedProducts?.sizevariantData?.filter(
      (item: any) => selectedTableRows.includes(item.id)
    );
    // dispatch(postChannelUnMapping({}))
    const payload: IPostChannelUnMapping[] = currSelectedRows.map(
      (item: any) => {
        return {
          channelid: currChannel?.channelId,
          channelname: currChannel?.channelName,
          stylecode: item.stylecode,
          StyleVariantCode: item.baseproduct,
          sizevariantcode: item.code,
          isLive: true,
        };
      }
    );
    dispatch(postChannelUnMapping(payload)).then(() => {
      toast.success("Channel Unmapping successful!", {
        position: "top-right",
        duration: 2000,
      });
      dispatch(fetchTableData({ channelid: selectedChannel, type: subPdType }));
    });
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
      <Toaster />
    </Box>
  );
};

export default MappedModule;
