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
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const MultiSelectDropdown = (props: IProps) => {
  const { index, selectedChannels, setselectedChannels, currChannel } = props;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const { userChannelMappings } = useAppSelector((state) => state.gateway);

  useEffect(() => {
    currChannel && setSelectedNames((prev) => [...prev, currChannel]);
  }, [currChannel]);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    if (!value.includes(currChannel)) value.push(currChannel);
    setSelectedNames(value);
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
        <InputLabel>Select multiple channels</InputLabel>
        <Select
          multiple
          value={selectedChannels?.[index]?.value || []}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput label="Select multiple channels" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              <p>{selected.length} channels selected</p>
              {/* {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => {
                    setSelectedNames(() => {
                      const newValue = (
                        selectedChannels?.[index]?.value || []
                      ).filter((item) => item !== value);
                      // console.log({ selectedNames, value, newValue });
                      setselectedChannels?.((prev: any) => {
                        const newPrev = { ...prev };
                        newPrev[index] = {
                          value: newValue,
                        };
                        return newPrev;
                      });
                      return newValue;
                    });
                  }}
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))} */}
            </Stack>
          )}
        >
          {userChannelMappings.map((item: any) => (
            <MenuItem
              key={item.id}
              value={item.channelId}
              sx={{ justifyContent: "space-between" }}
            >
              {item.channelName}
              {selectedNames.includes(item.channelId) ? (
                <CheckIcon color="info" />
              ) : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectDropdown;
