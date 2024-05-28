import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import { Box, Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

interface IFooter {
  handlePostChannnelMapping: () => void;
  setselectedChannels: any;
  selectedChannels: React.Dispatch<any>;
  currChannel: any;
  isDisabled: boolean;
}

const UnMappedFooter = (props: IFooter) => {
  const {
    handlePostChannnelMapping,
    currChannel,
    isDisabled,
    selectedChannels,
    setselectedChannels,
  } = props;
  const UNMappedFooter = () => (
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
        onClick={() => handlePostChannnelMapping()}
        disabled={isDisabled}
        sx={{ padding: "4px 32px" }}
        variant="contained"
      >
        Map Channels
      </Button>
    </GridFooterContainer>
  );
  return UNMappedFooter;
};

export default UnMappedFooter;
