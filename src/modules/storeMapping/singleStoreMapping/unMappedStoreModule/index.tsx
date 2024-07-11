import {
  unMappedColumnsForStoreMap,
  unMappedRowsForStoreMap,
} from "@/constants/tableConstant";
import { IApprovedPdTypesForStoreMap } from "@/interfaces/product";
import {
  fetchTableDataForStoreMap,
  postStoreMapping,
} from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import {
  GridColDef,
  GridPaginationModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import UnMappedFooterForStoreMap from "./UnMappedFooterForStoreMap";

interface TableRow {
  id: number;
  storecode: string;
  storename: string;
  streetname: string;
}
interface TableState {
  columns: GridColDef[];
  rows: TableRow[];
  isLoading: boolean;
  page: number;
  pageSize: number;
}

// Initial state
const initialState: TableState = {
  columns: unMappedColumnsForStoreMap, // Define your columns here
  rows: [],
  isLoading: false,
  page: 0,
  pageSize: 10,
};

const UnMappedStoreMap = () => {
  const [tableState, setTableState] = useState<TableState>(initialState);
  const [unMappedProducts, setUnMappedProducts] = useState([]);
  const [unMappedProductsCount, setUnMappedProductsCount] = useState(0);

  const {
    selectedChannel,
    // subPdType,
    // aprovedProducts: unMappedProductsForStoreMap,
    userChannelMappings: userChannel,
  } = useAppSelector((state) => state.gateway);
  const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];

  useEffect(() => {
    dispatch(
      fetchTableDataForStoreMap({
        channelid: selectedChannel,
        pageNumber: tableState.page + 1,
        pageSize: tableState.pageSize,
        type: IApprovedPdTypesForStoreMap.UN_MAPPED,
      })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          if (res.data) {
            setUnMappedProductsCount(res.data.totCount);
            setUnMappedProducts(res.data.data);
          }
        }
      });
    if (selectedChannel) {
      const currChannel = userChannelMappings?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel);
    }
  }, [selectedChannel]);

  const dispatch = useAppDispatch();
  // const getStoreTableData = useTableDataForStoreMap();

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const [currChannel, setCurrChannel] = useState<any>("");

  useEffect(() => {
    if (unMappedProducts?.length) {
      const data = unMappedProducts;
      const newRows = data?.map(
        (item: (typeof unMappedRowsForStoreMap)[0]) => ({
          id: item.id,
          storecode: item.storecode,
          storename: item.storename,
          streetname: item.streetname,
        })
      );

      setTableState((prev) => {
        return {
          ...prev,
          rows: newRows,
        };
      });
    }
  }, [unMappedProducts]);

  const handlePostStoreMapping = () => {
    const currSelectedRows = unMappedProducts?.filter((item: any) =>
      selectedTableRows.includes(item.id)
    );

    if (!selectedChannels?.[0]) {
      //handle single channel mappings
      const payload: any[] = currSelectedRows.map((item: any) => {
        return {
          channelid: currChannel?.channelId,
          channelname: currChannel?.channelName,
          storecode: item.storecode,
          storename: item.storename,
        };
      });
      dispatch(postStoreMapping(payload)).then(() => {
        toast.success("Store mapping successful!", {
          position: "top-right",
          duration: 2000,
        });

        dispatch(
          fetchTableDataForStoreMap({
            channelid: selectedChannel,
            type: IApprovedPdTypesForStoreMap.UN_MAPPED,
          })
        )
          .unwrap()
          .then((res) => {
            if (res) {
              if (res.data) {
                setUnMappedProductsCount(res.data.totCount);
                setUnMappedProducts(res.data.data);
              }
            }
          });
      });
    } else {
      //handle multiple channel mappings
      const payload: any[] = currSelectedRows.map((item: any) => {
        return {
          channelid: "",
          channelname: "",
          storecode: item.storecode,
          storename: item.storename,
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

      dispatch(postStoreMapping(combinedData)).then(() => {
        toast.success("Channel mapping successful!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(
          fetchTableDataForStoreMap({
            channelid: selectedChannel,
            type: IApprovedPdTypesForStoreMap.UN_MAPPED,
          })
        )
          .unwrap()
          .then((res) => {
            if (res) {
              if (res.data) {
                setUnMappedProductsCount(res.data.totCount);
                setUnMappedProducts(res.data.data);
              }
            }
          });
      });
    }
  };

  useEffect(() => {
    setTableState((old) => ({ ...old, isLoading: true }));
    dispatch(
      fetchTableDataForStoreMap({
        channelid: selectedChannel,
        pageNumber: tableState.page + 1,
        pageSize: tableState.pageSize,
        type: IApprovedPdTypesForStoreMap.UN_MAPPED,
      })
    ).then(() => {
      setTableState((old) => ({
        ...old,
        isLoading: false,
      }));
    });
  }, [tableState.page, tableState.pageSize]);

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  const footerParameters = {
    handlePostStoreMapping,
    setselectedChannels,
    selectedChannels,
    currChannel,
    isDisabled: !!!selectedTableRows?.length,
  };
  return (
    <Box width="100%">
      {unMappedProducts?.length ? (
        <FeaturedTable
          {...{
            loading: tableState.isLoading,
            rows: tableState.rows,
            columns: tableState.columns,
            checkboxSelection: true,
            onRowSelectionModelChange,
            rowCount: unMappedProductsCount,
            paginationMode: "server",
            onPaginationModelChange: ({
              page,
              pageSize,
            }: GridPaginationModel) => {
              setTableState((old) => ({ ...old, page, pageSize }));
            },
            slots: {
              footer: () => <UnMappedFooterForStoreMap {...footerParameters} />,
            },
          }}
        />
      ) : null}
      <Toaster />
    </Box>
  );
};
export default UnMappedStoreMap;
