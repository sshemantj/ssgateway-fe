import React, { useEffect, useState } from "react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  selectedChannels?: {
    value: string[];
  }[];
  setselectedChannels: React.Dispatch<any> | undefined;
  index: number;
  currChannel: string;
}

const style: React.CSSProperties = {
  background: "#fff",
  height: "100%",
  width: "14rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const MultiSelectDropdown = (props: IProps) => {
  const { index, selectedChannels, setselectedChannels, currChannel } = props;
  const { userChannelMappings } = useAppSelector((state) => state.gateway);

  const selectedChannelValue = selectedChannels?.[index]?.value;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    if (!value.includes(currChannel)) value.push(currChannel);
    setselectedChannels?.((prev: any) => {
      const newPrev = { ...prev };
      newPrev[index] = {
        value,
      };
      return newPrev;
    });
  };

  return (
    <div style={style}>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel
          sx={{
            top: selectedChannelValue ? 0 : "-10px",
          }}
        >
          Map multiple channels
        </InputLabel>
        <Select
          multiple
          value={selectedChannelValue || []}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput label="Map multiple channels" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              <p>{selected.length} channels selected</p>
            </Stack>
          )}
          inputProps={{
            sx: {
              padding: "6px",
            },
          }}
        >
          {Array.isArray(userChannelMappings) &&
            userChannelMappings?.map(({ id, channelId, channelName }: any) => {
              const isChecked =
                selectedChannelValue?.includes(channelId) ||
                currChannel === channelId;
              return (
                <MenuItem
                  key={id}
                  value={channelId}
                  sx={{ justifyContent: "space-between" }}
                >
                  {channelName}
                  {isChecked && <CheckIcon color="info" />}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectDropdown;
