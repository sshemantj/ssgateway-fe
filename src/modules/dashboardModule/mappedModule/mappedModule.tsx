import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const MappedFooter = (handleMappProduct: () => void, isDisabled: boolean) => {
  return () => (
    <GridFooterContainer>
      <GridFooter />
      <Button
        onClick={() => handleMappProduct()}
        disabled={isDisabled}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Unmap Channels
      </Button>
    </GridFooterContainer>
  );
};

export default MappedFooter;
