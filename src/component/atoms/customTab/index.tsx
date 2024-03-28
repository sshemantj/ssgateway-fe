import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface IProps {
  buttonList: { label: string; value: string }[];
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const ColorTabs = (props: IProps) => {
  const { buttonList, value, setValue } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        {buttonList.map((item, index) => {
          return <Tab key={index} value={item.value} label={item.label} />;
        })}
      </Tabs>
    </Box>
  );
};
export default ColorTabs;
