import {
  mappedColumnsForStoreMap,
  mappedRowsForStoreMap,
} from "@/constants/tableConstant";
import { IApprovedPdTypesForStoreMap } from "@/interfaces/product";
import {
  fetchTableDataForStoreMap,
  postChannelUnMapping,
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
import MappedFooter from "./mapStoreModule";

interface TableRow {
  id: number;
  storecode: string;
  storename: string;
  channelid: string;
  channelname: string;
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
  columns: mappedColumnsForStoreMap, // Define your columns here
  rows: [],
  isLoading: false,
  page: 0,
  pageSize: 10,
};

const MappedStoreModule = () => {
  const [tableState, setTableState] = useState<TableState>(initialState);
  const [currChannel, setCurrChannel] = useState<any>("");
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);
  const [mappedProducts, setMappedProducts] = useState([]);
  const [mappedProductsCount, setMappedProductsCount] = useState(0);

  const {
    selectedChannel,
    subPdType,
    // aprovedProducts: mappedProducts,
    userChannelMappings: userChannel,
  } = useAppSelector((state) => state.gateway);
  const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchTableDataForStoreMap({
        channelid: selectedChannel,
        pageNumber: tableState.page + 1,
        pageSize: tableState.pageSize,
        type: IApprovedPdTypesForStoreMap.MAPPED,
      })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          if (res.data) {
            setMappedProductsCount(res.data.totCount);
            setMappedProducts(res.data.data);
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
  useEffect(() => {
    if (mappedProducts?.length) {
      const data = mappedProducts;
      const newRows = data?.map((item: (typeof mappedRowsForStoreMap)[0]) => ({
        id: item.storeChannelMappingId,
        storecode: item.storecode,
        storename: item.storename,
        channelid: item.channelid,
        channelname: item.channelname,
      }));

      setTableState((prev) => {
        return {
          ...prev,
          rows: newRows,
        };
      });
    }
  }, [mappedProducts]);

  useEffect(() => {
    if (selectedChannel) {
      const currChannel = userChannel?.find(
        (item: any) => item.channelId === selectedChannel
      );
      setCurrChannel(currChannel);
    }
  }, [selectedChannel, userChannel]);

  useEffect(() => {
    if (mappedProducts?.length) {
      const data = mappedProducts;
      const newRows = data?.map((item: (typeof mappedRowsForStoreMap)[0]) => ({
        id: item.storeChannelMappingId,
        storecode: item.storecode,
        storename: item.storename,
        channelid: item.channelid,
        channelname: item.channelname,
      }));

      setTableState((prev) => {
        return {
          ...prev,
          rows: newRows,
        };
      });
    }
  }, [mappedProducts]);

  useEffect(() => {
    setTableState((old) => ({ ...old, isLoading: true }));
    dispatch(
      fetchTableDataForStoreMap({
        channelid: selectedChannel,
        pageNumber: tableState.page + 1,
        pageSize: tableState.pageSize,
        type: IApprovedPdTypesForStoreMap.MAPPED,
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

  const handleMappProduct = () => {
    const currSelectedRows = mappedProducts?.filter((item: any) =>
      selectedTableRows.includes(item.storeChannelMappingId)
    );
    const payload: any[] = currSelectedRows.map((item: any) => {
      return {
        channelid: currChannel?.channelId,
        channelname: currChannel?.channelName,
        storecode: item.storecode,
        storename: item.storename,
      };
    });
    dispatch(postChannelUnMapping(payload)).then(() => {
      toast.success("Store Unmapping successful!", {
        position: "top-right",
        duration: 2000,
      });
      dispatch(
        fetchTableDataForStoreMap({
          channelid: selectedChannel,
          type: IApprovedPdTypesForStoreMap.MAPPED,
        })
      )
        .unwrap()
        .then((res) => {
          if (res) {
            if (res.data) {
              setMappedProductsCount(res.data.totCount);
              setMappedProducts(res.data.data);
            }
          }
        });
    });
  };
  return (
    <Box width="100%">
      {mappedProducts?.length ? (
        <FeaturedTable
          {...{
            loading: tableState.isLoading,
            rows: tableState.rows,
            columns: tableState.columns,
            checkboxSelection: true,
            onRowSelectionModelChange,
            rowCount: mappedProductsCount,
            paginationMode: "server",
            onPaginationModelChange: ({
              page,
              pageSize,
            }: GridPaginationModel) => {
              setTableState((old) => ({ ...old, page, pageSize }));
            },
            slots: {
              footer: () => (
                <MappedFooter
                  {...{
                    handleMappProduct,
                    isDisabled: !!!selectedTableRows?.length,
                  }}
                />
              ),
            },
          }}
        />
      ) : null}
      <Toaster />
    </Box>
  );
};

export default MappedStoreModule;
