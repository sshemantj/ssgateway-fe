import React from "react";
import { IBaseCardProps } from "..";
import { IApprovedPdTypes } from "@/interfaces/product";
import { useAppSelector } from "@/store/hooks";
import CustomTab2 from "../../customTab/customTab2";

interface IProps extends Omit<IBaseCardProps, "variant"> {
  unMappedCount: number;
  mappedCount: number;
  handleChange: (_: React.SyntheticEvent, newValue: any) => void;
}

const DoubleVariantCard = (props: IProps) => {
  const { mappedCount, unMappedCount, handleChange } = props;
  const { subPdType } = useAppSelector((state) => state.gateway);

  return (
    <CustomTab2
      {...{
        tabList: [
          { label: "Unmapped", value: IApprovedPdTypes.UN_MAPPED },
          { label: "mapped", value: IApprovedPdTypes.MAPPED },
        ],
        handleChange,
        value: subPdType,
      }}
    />
  );
};

export default DoubleVariantCard;
