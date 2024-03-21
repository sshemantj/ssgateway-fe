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
import { getSplit, setSplit } from "@/utils";

interface IProps {
  selectedChannels?: {
    value: string[];
  }[];
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
  const { index, selectedChannels, setselectedChannels } = props;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const { channelMasters } = useAppSelector((state) => state.gateway);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
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
      <FormControl sx={{ m: 1 }}>
        <InputLabel>Multiple Select</InputLabel>
        <Select
          multiple
          value={selectedChannels?.[index]?.value || []}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput label="Multiple Select" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={getSplit(value).value1}
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
              ))}
            </Stack>
          )}
        >
          {channelMasters.map((item: any) => (
            <MenuItem
              key={item.id}
              value={setSplit(item.channelid, item.id)}
              sx={{ justifyContent: "space-between" }}
            >
              {/* {selectedNames.length
                ? console.log(
                    { selectedNames, channelMasters },
                    setSplit(item.channelid, item.id)
                  )
                : null} */}
              {item.channelname}
              {selectedNames.includes(item.id) ? (
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
