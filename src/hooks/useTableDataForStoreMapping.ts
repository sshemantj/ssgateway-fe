import { fetchTableDataForStoreMap } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// interface IUseTableData extends Omit<IFetchTableData, "type"> {
//   type?: IProducts;
// }

const useTableDataForStoreMap = () => {
  const dispatch = useAppDispatch();
  const { selectedChannel: channelid, pdType } = useAppSelector(
    (state) => state.gateway
  );

  return (props: any) => {
    const { type, ...rest } = props;
    const finalType = type || pdType;

    finalType &&
      dispatch(
        fetchTableDataForStoreMap({ channelid, type: finalType, ...rest })
      ).catch((error) => console.log(error));
  };
};

export default useTableDataForStoreMap;
