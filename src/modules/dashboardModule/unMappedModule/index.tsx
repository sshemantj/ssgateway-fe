import React, { useEffect, useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { unMappedColumns, unMappedRows } from "@/constants/tableConstant";
import UnMappedFooter from "./unMappFooter";
import {
  IPostChannelMapping,
  fetchTableData,
  postChannelMapping,
} from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast, { Toaster } from "react-hot-toast";
import { IApprovedPdTypes } from "@/interfaces/product";

interface IProps {
  getAllCount: () => void;
}

const UnMappedModule = (props: IProps) => {
  const { getAllCount } = props;
  const [tableState, setTableState] = useState({
    columns: unMappedColumns,
    rows: [],
    isLoading: false,
    page: 1,
    pageSize: 10,
  });
  const {
    selectedChannel,
    subPdType,
    aprovedProducts: unMappedProducts,
    userChannelMappings: userChannel,
  } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();

  const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [currChannel, setCurrChannel] = useState<any>("");

  useEffect(() => {
    if (unMappedProducts?.sizevariantData?.length) {
      const data = unMappedProducts?.sizevariantData;
      const newRows = data?.map((item: (typeof unMappedRows)[0]) => ({
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
  }, [unMappedProducts]);

  useEffect(() => {
    setTableState((old) => ({ ...old, isLoading: true }));
    dispatch(
      fetchTableData({
        channelid: selectedChannel,
        pageNumber: tableState.page + 1,
        pageSize: tableState.pageSize,
        type: IApprovedPdTypes.UN_MAPPED,
      })
    ).then(() => {
      setTableState((old) => ({
        ...old,
        isLoading: false,
      }));
    });
  }, [tableState.page, tableState.pageSize]);

  useEffect(() => {
    if (selectedChannel) {
      const currChannel = userChannelMappings?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel);
    }
  }, [selectedChannel]);

  const handlePostChannnelMapping = () => {
    const currSelectedRows = unMappedProducts?.sizevariantData?.filter(
      (item: any) => selectedTableRows.includes(item.id)
    );

    if (!selectedChannels?.[0]) {
      //handle single channel mappings
      const payload: IPostChannelMapping[] = currSelectedRows.map(
        (item: any) => {
          return {
            channelid: currChannel?.channelId,
            channelname: currChannel?.channelName,
            stylecode: item.stylecode,
            StyleVariantCode: item.baseproduct,
            sizevariantcode: item.code,
          };
        }
      );
      dispatch(postChannelMapping(payload)).then(() => {
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        getAllCount();
        dispatch(
          fetchTableData({ channelid: selectedChannel, type: subPdType })
        );
      });
    } else {
      //handle multiple channel mappings
      const payload: IPostChannelMapping[] = currSelectedRows.map(
        (item: any) => {
          return {
            channelid: "",
            channelname: "",
            stylecode: item.stylecode,
            StyleVariantCode: item.baseproduct,
            sizevariantcode: item.code,
          };
        }
      );

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
        getAllCount();
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
      {unMappedProducts?.sizevariantData ? (
        <FeaturedTable
          {...{
            loading: tableState.isLoading,
            rows: tableState.rows,
            columns: tableState.columns,
            checkboxSelection: true,
            onRowSelectionModelChange,
            rowCount: unMappedProducts?.totalRecords,
            paginationMode: "server",
            onPaginationModelChange: ({
              page,
              pageSize,
            }: GridPaginationModel) => {
              setTableState((old) => ({ ...old, page, pageSize }));
            },
            slots: {
              footer: () => <UnMappedFooter {...footerParameters} />,
            },
          }}
        />
      ) : null}
      <Toaster />
    </Box>
  );
};

export default UnMappedModule;
