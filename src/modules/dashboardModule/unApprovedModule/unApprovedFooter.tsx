import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const UnApprovedFooter = (
  handleApprovedProduct: () => void,
  isDisabled: boolean
) => {
  return () => (
    <GridFooterContainer>
      <GridFooter />
      <Button
        onClick={() => handleApprovedProduct()}
        disabled={isDisabled}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Approve
      </Button>
    </GridFooterContainer>
  );
};

export default UnApprovedFooter;
