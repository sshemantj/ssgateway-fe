import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import React from "react";

interface IProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
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
      <h2 id="parent-modal-title">Text in a modal</h2>
      <p id="parent-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </Box>
  );
};

export default ModalComponent;
