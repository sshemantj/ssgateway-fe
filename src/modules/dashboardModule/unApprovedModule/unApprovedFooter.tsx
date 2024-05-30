import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

interface IProps {
  handleApprovedProduct: () => void;
  isDisabled: boolean;
}

const UnApprovedFooter = (props: IProps) => {
  const { handleApprovedProduct, isDisabled } = props;
  return (
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
