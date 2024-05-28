import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const UnApprovedFooter = (handleApprovedProduct: () => void) => {
  return () => (
    <GridFooterContainer>
      <GridFooter />
      <Button
        onClick={() => handleApprovedProduct()}
        // disabled={!!!currSelectedRow.length}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Approve
      </Button>
    </GridFooterContainer>
  );
};

export default UnApprovedFooter;
