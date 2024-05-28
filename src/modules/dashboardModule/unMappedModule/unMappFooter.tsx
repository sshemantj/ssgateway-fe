import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const UnMappedFooter = (handlePostChannnelMapping: () => void) => {
  return () => (
    <GridFooterContainer>
      <GridFooter />
      <Button
        onClick={() => handlePostChannnelMapping()}
        // disabled={!!!currSelectedRow.length}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Map Channels
      </Button>
    </GridFooterContainer>
  );
};

export default UnMappedFooter;
