import React, { useState } from "react";
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
  setselectedChannels: React.Dispatch<any> | undefined;
  index: number;
}

const style: React.CSSProperties = {
  paddingTop: "2rem",
  background: "#fff",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const MultiSelectDropdown = (props: IProps) => {
  const { index, setselectedChannels } = props;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const { channelMasters } = useAppSelector((state) => state.gateway);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    setSelectedNames(value);

    setselectedChannels?.((prev: any) => {
      const newPrev = { ...prev };
      newPrev[index] = value;
      return newPrev;
    });
  };
  return (
    <div style={style}>
      <FormControl sx={{ m: 1 }}>
        <InputLabel>Multiple Select</InputLabel>
        <Select
          multiple
          value={selectedNames}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput label="Multiple Select" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => {
                    setSelectedNames(() => {
                      const newValue = selectedNames.filter(
                        (item) => item !== value
                      );
                      setselectedChannels?.((prev: any) => {
                        const newPrev = { ...prev };
                        newPrev[index] = newValue;
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
              ))}
            </Stack>
          )}
        >
          {channelMasters.map((item: any) => (
            <MenuItem
              key={item.id}
              value={item.channelid}
              sx={{ justifyContent: "space-between" }}
            >
              {item.channelname}
              {selectedNames.includes(item.channelid) ? (
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
