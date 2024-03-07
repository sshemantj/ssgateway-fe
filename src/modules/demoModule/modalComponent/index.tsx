import CustomTable from "@/component/molecules/CustomeTable";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import React, { useState } from "react";

interface IProps {}

const style = {
  position: "absolute" as "absolute",
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

const ModalComponent = (props: IProps) => {
  const {} = props;
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [allCheckBox, setAllCheckBox] = useState<any>({});
  const [open, setOpen] = useState<any>({});

  const rowData = useAppSelector((state) => state.gateway.singleItem);
  const { styleVariants } = useAppSelector(
    (state) => state.gateway.styleVariants
  );

  const selectDataList = styleVariants.map((item: any) => ({
    label: item.colourDesc,
    value: item.colourDesc,
  }));

  console.log(styleVariants);

  // const tableDataList = rowData.styleVariants[0].sizeVariants;

  // const theadArr = Object.keys(tableDataList?.[0]);

  // console.log(selectedRows);
  console.log(allCheckBox);

  // const selectedRowFunWrapper = (currItem: any, index: number) => {
  //   return (prevRow: any) => {
  //     let newRow = [...prevRow];
  //     if (
  //       prevRow.find((item: any) => {
  //         return item.code === currItem.code;
  //       })
  //     ) {
  //       newRow = newRow.filter((item) => item.code !== currItem.code);
  //       setOpen((prev: any) => {
  //         return {
  //           ...prev,
  //           [index]: false,
  //         };
  //       });
  //     } else {
  //       newRow.push(currItem);
  //       setOpen((prev: any) => {
  //         return {
  //           ...prev,
  //           [index]: true,
  //         };
  //       });
  //     }
  //     return newRow;
  //   };
  // };

  // const handleRowClick = (currItem: any, index: number) => {
  //   // const handleSelectedRows = selectedRowFunWrapper(currItem, index);
  //   // setSelectedRows(handleSelectedRows);
  // };

  // const handleSingleRowClick = (
  //   e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  //   key: string,
  //   value: any,
  //   index: number
  // ) => {
  //   e.stopPropagation();
  //   const newCheckBox = { ...allCheckBox };

  //   if (newCheckBox[index] === undefined) {
  //     newCheckBox[index] = {};
  //   }

  //   if (newCheckBox[index][key]) {
  //     newCheckBox[index][key] = null;
  //   } else {
  //     newCheckBox[index][key] = true;
  //   }
  //   setAllCheckBox(newCheckBox);
  // };

  return (
    <Box sx={{ ...style }}>
      <SelectDropdown label="Select StyleVariants" data={selectDataList} />
      {/* <CustomTable
        {...{
          open,
          theadArr,
          allCheckBox,
          handleRowClick,
          isMultiSelects: true,
          handleSingleRowClick,
          tbodyArr: tableDataList,
        }}
      /> */}
    </Box>
  );
};

export default ModalComponent;
