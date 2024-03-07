import SelectDropdown from "@/component/molecules/selectDropdown";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import React from "react";

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

  const rowData = useAppSelector((state) => state.gateway.singleItem);

  console.log(rowData);

  return (
    <Box sx={{ ...style }}>
      <SelectDropdown label="Select StyleVariants" data={categoryDB} />
    </Box>
  );
};

export default ModalComponent;
