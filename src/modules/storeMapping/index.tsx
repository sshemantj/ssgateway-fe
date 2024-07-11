import { IStoreMappingSubRoutes } from "@/constants/allRoutes";
import { useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import styles from "../dashboardModule/customtable.module.scss";
import BulkStoreMapping from "./bulkStoreMapping";
import SinglStoreMapping from "./singleStoreMapping";

const StoreMapping = () => {
  // const [open, setOpen] = useState<any>({});
  // const [search, setSearch] = useState<string>("");
  // const [currSelectedRow, setCurrSelectedRow] = useState<any[]>([]);
  // const [selectedChannels, setselectedChannels] = useState<any>({});
  // const [pageSize, setPageSize] = useState<number>(100);
  // const [isAllChecked, setIsAllChecked] = useState<boolean>(true);
  // const [selectedCatlog, setselectedCatlog] = useState<string>("all");
  // const [currChannel, setCurrChannel] = useState<any>("");
  // const [productType, setProductType] = useState<string>("");
  // const [totalCount, setTotalCount] = useState<{
  //   mapped: number | null;
  //   unmapped: number | null;
  // }>({
  //   mapped: null,
  //   unmapped: null,
  // });
  // const dispatch = useAppDispatch();
  // const getTableData = useTableData();
  // const searchParams = useSearchParams();
  // const screen = searchParams.get("screen");
  // const isMobile = useMobileCheck();
  // const { downloadFile } = useDownloadFile();

  // const { sizevariantData: apiRes, totalRecords } = useAppSelector(
  //   (state) => state.gateway.data
  // );
  // const { pdType, selectedChannel, subPdType } = useAppSelector(
  //   (state) => state.gateway
  // );
  // const userChannel = useAppSelector(
  //   (state) => state.gateway.userChannelMappings
  // );
  // const userChannelMappings = Array.isArray(userChannel) ? userChannel : [];

  // const isUnapprovedScreen = pdType === IProductsTypes.UNAPPROVED;

  // const isUnmappedScreen =
  //   pdType === IProductsTypes.APPROVED &&
  //   subPdType === IApprovedPdTypes.UN_MAPPED;
  // const isMappedScreen =
  //   pdType === IProductsTypes.APPROVED && subPdType === IApprovedPdTypes.MAPPED;

  // const keysArray =
  //   apiRes && apiRes?.length
  //     ? [
  //         "code",
  //         "baseproduct",
  //         "sizecode",
  //         "sizedesc",
  //         "stylecode",
  //         "subdepartmentcode",
  //       ]
  //     : [];

  // useEffect(() => {
  //   if (screen) {
  //     setProductType(screen);
  //   }
  // }, [screen]);

  // useEffect(() => {
  //   if (pdType) {
  //     // setSearch("");
  //     // setCurrSelectedRow([]);
  //     // setPageSize(100);
  //     // setselectedChannels({});
  //     // dispatch(resetHomeTableData());
  //     // getTableData({});
  //   }
  // }, [pdType, subPdType]);

  // const getAllCount = () => {
  //   dispatch(getCountApi({ type: "unmapped", channelid: selectedChannel }))
  //     .unwrap()
  //     .then((res) => {
  //       setTotalCount((prev) => ({
  //         ...prev,
  //         unmapped: res?.totalCount,
  //       }));
  //     });

  //   dispatch(getCountApi({ type: "mapped", channelid: selectedChannel }))
  //     .unwrap()
  //     .then((res) => {
  //       setTotalCount((prev) => ({
  //         ...prev,
  //         mapped: res?.totalCount,
  //       }));
  //     });
  // };

  // useEffect(() => {
  //   if (pdType === IProductsTypes.APPROVED && selectedChannel) {
  //     getAllCount();
  //   }
  // }, [pdType, selectedChannel]);

  // // useEffect(() => {
  // //   getTableData({ pageSize, type: productType as IProducts });
  // // }, [pageSize]);

  // const handleRowClick = (item: any, index: number) => {
  //   setOpen((prev: any) => {
  //     return {
  //       ...prev,
  //       [productType]: {
  //         ...prev?.[productType],
  //         [item.id]: prev?.[productType]?.[item.id] ? false : true,
  //       },
  //     };
  //   });

  //   if (pdType !== IApprovedPdTypes.MAPPED) {
  //     setCurrSelectedRow((prev) => {
  //       if (!Array.isArray(prev)) return [];

  //       const data = prev.find((prevItem) => {
  //         return prevItem.id === item.id;
  //       });

  //       if (!data) {
  //         prev = [...prev, item];
  //       } else {
  //         prev = prev.filter((prevItem) => {
  //           return prevItem.id !== item.id;
  //         });
  //       }

  //       return prev;
  //     });
  //   }
  // };

  // const handlePagination = (pageNumber: number) => {
  //   getTableData({
  //     pageNumber,
  //     searchTerm: search,
  //     pageSize,
  //   });
  // };

  // const handleChange = (_: React.SyntheticEvent, newValue: any) => {
  //   setProductType(newValue);
  //   dispatch(changeSubPdType(newValue));
  //   dispatch(
  //     fetchTableData({ channelid: selectedChannel, type: newValue })
  //   ).catch((error) => console.log(error));
  // };

  // const showBtnText = () => {
  //   switch (pdType) {
  //     case IApprovedPdTypes.UN_MAPPED:
  //       return `Map channels`;

  //     case IApprovedPdTypes.MAPPED:
  //       break;

  //     case IProductsTypes.UNAPPROVED:
  //       return `Approve`;
  //   }
  // };

  // const handlePostChannnelMapping = () => {
  //   if (!selectedChannels?.[0]) {
  //     //handle single channel mappings
  //     const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
  //       return {
  //         channelid: currChannel?.channelId,
  //         channelname: currChannel?.channelName,
  //         stylecode: item.stylecode,
  //         StyleVariantCode: item.baseproduct,
  //         sizevariantcode: item.code,
  //       };
  //     });
  //     dispatch(postChannelMapping(payload)).then(() => {
  //       toast.success("Channel mapping successful!", {
  //         position: "top-right",
  //         duration: 2000,
  //       });
  //       dispatch(
  //         fetchTableData({ channelid: selectedChannel, type: subPdType })
  //       );
  //     });
  //   } else {
  //     //handle multiple channel mappings
  //     const payload: IPostChannelMapping[] = currSelectedRow.map((item) => {
  //       return {
  //         channelid: "",
  //         channelname: "",
  //         stylecode: item.stylecode,
  //         StyleVariantCode: item.baseproduct,
  //         sizevariantcode: item.code,
  //       };
  //     });

  //     const allSelectedChannels =
  //       userChannelMappings
  //         ?.filter((item: any) =>
  //           selectedChannels?.[0].value?.includes(item.channelId)
  //         )
  //         ?.map((item: any) => ({
  //           channelid: item?.channelId,
  //           channelname: item?.channelName,
  //         })) || [];

  //     const combinedData = payload.flatMap((item2) =>
  //       allSelectedChannels.map((item1: any) => {
  //         return { ...item2, ...item1 };
  //       })
  //     );

  //     dispatch(postChannelMapping(combinedData)).then(() => {
  //       toast.success("Channel mapping successful!", {
  //         position: "top-right",
  //         duration: 2000,
  //       });
  //       dispatch(
  //         fetchTableData({ channelid: selectedChannel, type: subPdType })
  //       );
  //     });
  //   }
  // };

  // const handleApprovedProduct = () => {
  //   const idList = currSelectedRow.map((item) => item.id);
  //   dispatch(approveSizevariants({ payload: idList, source: "UI" })).then(
  //     () => {
  //       toast.success("Product successfully aproved!", {
  //         position: "top-right",
  //         duration: 2000,
  //       });
  //       getTableData({
  //         pageSize,
  //       });
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (selectedChannel) {
  //     const currChannel = userChannelMappings?.find(
  //       (item: any) => item.channelId === selectedChannel
  //     );
  //     setCurrChannel(currChannel);
  //   }
  // }, [selectedChannel]);

  // const handleHeaderClick = (name: string) => {
  //   if (name === "check") {
  //     const allIds = apiRes?.reduce((acc: any, curr: any) => {
  //       acc[curr.id] = true;
  //       return acc;
  //     }, {});

  //     setCurrSelectedRow(isAllChecked ? apiRes : []);

  //     setOpen((prev: any) => {
  //       return {
  //         ...prev,
  //         [productType]: isAllChecked ? allIds : {},
  //       };
  //     });

  //     setIsAllChecked((prev) => !prev);
  //   }
  // };

  // const handlePageSizeSelection = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setPageSize(+e.target.value);
  // };

  // const handleCatlogSelect = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const value = e.target.value;
  //   setselectedCatlog(value);
  //   const params: IFetchTableData = {
  //     type: IApprovedPdTypes.MAPPED,
  //     channelid: selectedChannel,
  //   };

  //   switch (value) {
  //     case "all":
  //       break;
  //     case "pendingLive":
  //       params.isLive = false;
  //       break;
  //     case "live":
  //       params.isLive = true;
  //       break;
  //     case "pendingCatalog":
  //       params.iscatalog = false;
  //       break;
  //     case "cataLogCreated":
  //       params.iscatalog = true;
  //       break;
  //   }
  //   dispatch(
  //     fetchTableData({
  //       ...params,
  //     })
  //   ).catch((error) => console.log(error));
  // };

  // const handleDownloadClick = () => {
  //   let url = "";
  //   let fileName = "";
  //   const searchTerm = search;
  //   const channelid = selectedChannel;
  //   const params: any = {};

  //   if (isUnapprovedScreen) {
  //     url = "api/Products/DownloadUnAprrovedsizevariants";
  //     fileName = IProductsTypes.UNAPPROVED;
  //     if (searchTerm) params.searchTerm = searchTerm;
  //   }
  //   if (!isUnapprovedScreen && isUnmappedScreen) {
  //     url = "api/Products/DownloadApprovedUnMappedSizevariants";
  //     if (searchTerm) params.searchTerm = searchTerm;
  //     if (channelid) params.channelid = channelid;
  //     fileName = IApprovedPdTypes.UN_MAPPED;
  //   }
  //   if (!isUnapprovedScreen && isMappedScreen) {
  //     url = "api/Products/DownloadApprovedMappedSizevariants";
  //     if (searchTerm) params.searchTerm = searchTerm;
  //     if (channelid) params.channelid = channelid;
  //     switch (selectedCatlog) {
  //       case "all":
  //         break;
  //       case "pendingLive":
  //         params.isLive = false;
  //         break;
  //       case "live":
  //         params.isLive = true;
  //         break;
  //       case "pendingCatalog":
  //         params.iscatalog = false;
  //         break;
  //       case "cataLogCreated":
  //         params.iscatalog = true;
  //         break;
  //     }
  //     fileName = IApprovedPdTypes.MAPPED;
  //   }
  //   if (!url) {
  //     toast.error("Page Type is invalid!", {
  //       position: "top-right",
  //       duration: 2000,
  //     });
  //     return;
  //   }
  //   downloadFile({
  //     fileName: fileName ? `${fileName}.csv` : "productList.csv",
  //     urlString: API_BASE_URL + url,
  //     params,
  //   });
  // };

  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.tableWrapper}>
        {screen === IStoreMappingSubRoutes.SINGLE_MAPPING ? (
          <SinglStoreMapping />
        ) : null}
        {screen === IStoreMappingSubRoutes.BULK_MAPPING ? (
          <BulkStoreMapping />
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};

export default StoreMapping;
