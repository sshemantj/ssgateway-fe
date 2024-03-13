import CustomTable from "@/component/molecules/CustomeTable";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { getSizeVariants } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const ModalComponent = () => {
  const [allCheckBox, setAllCheckBox] = useState<any>({});

  const { styleVariants } = useAppSelector((state) => state.gateway);
  const { sizeVariants } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();

  const selectDataList = styleVariants.map((item: any) => ({
    label: item.colourDesc,
    value: item.colourDesc,
  }));

  const theadArr = Object.keys(sizeVariants?.[0] || {});

  const handleRowClick = (row: any, index: number) => {
    const newCheckBox = { ...allCheckBox };
    if (newCheckBox[index]) {
      newCheckBox[index] = null;
    } else {
      newCheckBox[index] = true;
    }
    setAllCheckBox(newCheckBox);
  };

  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    dispatch(getSizeVariants({ stylevairiantId: value }));
  };

  return (
    <Box sx={{ ...style }}>
      <SelectDropdown
        handleOnChange={handleOnChange}
        label="Select StyleVariants"
        data={selectDataList}
      />
      <CustomTable
        {...{
          theadArr,
          allCheckBox,
          isMultiSelects: true,
          handleRowClick,
          tbodyArr: sizeVariants,
        }}
      />
    </Box>
  );
};

export default ModalComponent;
