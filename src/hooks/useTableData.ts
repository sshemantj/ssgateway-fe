import { IFetchTableData, fetchTableData } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IProducts } from "@/store/slices/gatewaySlice";

interface IUseTableData extends Omit<IFetchTableData, 'type'> {
    type?: IProducts
}

const useTableData = () => {
    const dispatch = useAppDispatch();
    const { selectedChannel: channelid, pdType } = useAppSelector((state) => state.gateway);

    return (props: IUseTableData) => {
        const { type, ...rest } = props;
        type || pdType && dispatch(fetchTableData({ channelid, type: type || pdType, ...rest }))
    }
}


export default useTableData;