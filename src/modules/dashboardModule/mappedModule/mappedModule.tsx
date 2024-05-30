import React from "react";
import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";

interface IProps {
  handleMappProduct: () => void;
  isDisabled: boolean;
}

const MappedFooter = (props: IProps) => {
  const { handleMappProduct, isDisabled } = props;
  return (
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
