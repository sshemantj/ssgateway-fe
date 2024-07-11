import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import { Box, Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

interface IFooter {
  handlePostStoreMapping: () => void;
  setselectedChannels: any;
  selectedChannels: React.Dispatch<any>;
  currChannel: any;
  isDisabled: boolean;
}

const UnMappedFooterForStoreMap = (props: IFooter) => {
  const {
    handlePostStoreMapping,
    currChannel,
    isDisabled,
    selectedChannels,
    setselectedChannels,
  } = props;
  return (
    <GridFooterContainer>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <GridFooter />
        {/* @ts-ignore */}
        <MultiSelectDropdown
          {...{
            setselectedChannels,
            selectedChannels,
            index: 0,
            currChannel: currChannel?.channelId || "",
          }}
        />
      </Box>
      <Button
        onClick={() => handlePostStoreMapping()}
        disabled={isDisabled}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Map Stores
      </Button>
    </GridFooterContainer>
  );
};

export default UnMappedFooterForStoreMap;
