import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const MappedFooter = () => {
  return (
    <GridFooterContainer>
      <GridFooter />
      <Button
        // onClick={() => handleButtonClick()}
        // disabled={!!!currSelectedRow.length}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Unmap Channels
      </Button>
    </GridFooterContainer>
  );
};

export default MappedFooter;
