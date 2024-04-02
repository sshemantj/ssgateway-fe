import { IFetchTableData, fetchTableData } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const useTableData = () => {
    const dispatch = useAppDispatch();
    const { selectedChannel: channelid, pdType } = useAppSelector((state) => state.gateway);

    return (props: Omit<IFetchTableData, "type">) => {
        dispatch(fetchTableData({ channelid, type: pdType, ...props }))
    }
}


export default useTableData;