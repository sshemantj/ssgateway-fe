import React from "react";
import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";

const ViewPendingFooter = (
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

export default ViewPendingFooter;
