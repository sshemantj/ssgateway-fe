import { IApprovedPdTypesForStoreMap } from "@/interfaces/product";
import React from "react";
import { IBaseCardProps } from "..";
import CustomTab2 from "../../customTab/customTab2";

interface IProps extends Omit<IBaseCardProps, "variant"> {
  unMappedCount?: number;
  mappedCount?: number;
  handleChange: (_: React.SyntheticEvent, newValue: any) => void;
  value: any;
}

const DoubleVariantCardForStoreMap = (props: IProps) => {
  const { mappedCount, unMappedCount, handleChange, value } = props;
  // const { subPdType } = useAppSelector((state) => state.gateway);

  return (
    <CustomTab2
      {...{
        tabList: [
          {
            label: `${unMappedCount || ""} Unmapped`,
            value: IApprovedPdTypesForStoreMap.UN_MAPPED,
          },
          {
            label: `${mappedCount || ""} mapped`,
            value: IApprovedPdTypesForStoreMap.MAPPED,
          },
        ],
        handleChange,
        value: value,
      }}
    />
  );
};

export default DoubleVariantCardForStoreMap;
