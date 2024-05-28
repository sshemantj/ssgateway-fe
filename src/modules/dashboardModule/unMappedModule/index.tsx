import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { inProgressColumns, inProgressRows } from "@/constants/tableConstant";
import UnMappedFooter from "./unMappFooter";
import {
  IPostChannelMapping,
  fetchTableData,
  postChannelMapping,
} from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast, { Toaster } from "react-hot-toast";

interface IProps {}

const UnMappedModule = (props: IProps) => {
  const {} = props;
  const [tableState, setTableState] = useState({
    columns: inProgressColumns,
    rows: inProgressRows,
  });
  const {
    selectedChannel,
    subPdType,
    userChannelMappings: userChannel,
  } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();

  const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  const [currChannel, setCurrChannel] = useState<any>("");

  const handlePostChannnelMapping = () => {
    if (!selectedChannels?.[0]) {
      //handle single channel mappings
      const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
        return {
          channelid: currChannel?.channelId,
          channelname: currChannel?.channelName,
          stylecode: item.stylecode,
          StyleVariantCode: item.baseproduct,
          sizevariantcode: item.code,
        };
      });
      dispatch(postChannelMapping(payload)).then(() => {
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(
          fetchTableData({ channelid: selectedChannel, type: subPdType })
        );
      });
    } else {
      //handle multiple channel mappings
      const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
        return {
          channelid: "",
          channelname: "",
          stylecode: item.stylecode,
          StyleVariantCode: item.baseproduct,
          sizevariantcode: item.code,
        };
      });

      const allSelectedChannels =
        userChannelMappings
          ?.filter((item: any) =>
            selectedChannels?.[0].value?.includes(item.channelId)
          )
          ?.map((item: any) => ({
            channelid: item?.channelId,
            channelname: item?.channelName,
          })) || [];

      const combinedData = payload.flatMap((item2) =>
        allSelectedChannels.map((item1: any) => {
          return { ...item2, ...item1 };
        })
      );

      dispatch(postChannelMapping(combinedData)).then(() => {
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(
          fetchTableData({ channelid: selectedChannel, type: subPdType })
        );
      });
    }
  };

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  const footerParameters = {
    handlePostChannnelMapping,
    setselectedChannels,
    selectedChannels,
    currChannel,
    isDisabled: !!!selectedTableRows?.length,
  };

  return (
    <Box width="100%">
      <FeaturedTable
        {...{
          slots: { footer: UnMappedFooter(footerParameters) },
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

export default UnMappedModule;
