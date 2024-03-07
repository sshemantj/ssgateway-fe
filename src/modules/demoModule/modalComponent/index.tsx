import CustomTable from "@/component/molecules/CustomeTable";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import React, { useState } from "react";

interface IProps {}

const categoryDB = [
  {
    label: "Desktop PC",
    value: 1,
  },
  {
    label: "Notebook",
    value: 2,
  },
  {
    label: "Monitor",
    value: 3,
  },
];

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
};

const ModalComponent = (props: IProps) => {
  const {} = props;
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [open, setOpen] = useState<any>({});

  const rowData = useAppSelector((state) => state.gateway.singleItem);

  const tableDataList = rowData.styleVariants[0].sizeVariants;

  const theadArr = Object.keys(tableDataList?.[0]);

  console.log(selectedRows);

  const handleRowClick = (currItem: any, index: number) => {
    setSelectedRows((prevRow) => {
      let newRow = [...prevRow];
      if (
        prevRow.find((item) => {
          return item.code === currItem.code;
        })
      ) {
        newRow = newRow.filter((item) => item.code !== currItem.code);
        setOpen((prev: any) => {
          return {
            ...prev,
            [index]: false,
          };
        });
      } else {
        newRow.push(currItem);
        setOpen((prev: any) => {
          return {
            ...prev,
            [index]: true,
          };
        });
      }
      return newRow;
    });
  };

  return (
    <Box sx={{ ...style }}>
      <SelectDropdown label="Select StyleVariants" data={categoryDB} />
      <CustomTable
        handleRowClick={handleRowClick}
        open={open}
        theadArr={theadArr}
        tbodyArr={tableDataList}
      />
    </Box>
  );
};

export default ModalComponent;
