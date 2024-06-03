import React from "react";
import SelectDropdown from "@/component/molecules/selectDropdown";

interface IProps {
  handleCatlogSelect: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedCatlog: string;
}

const CatlogDropdown = (props: IProps) => {
  const { handleCatlogSelect, selectedCatlog } = props;
  return (
    <SelectDropdown
      handleOnChange={handleCatlogSelect}
      defaultValue="all"
      label="Select"
      value={selectedCatlog}
      inputProps={{
        sx: {
          padding: "6px 0 6px 2.6rem",
          textAlign: "start",
        },
      }}
      selectSx={{
        width: "12rem",
        "& .MuiInputBase-input": {
          padding: "5px",
        },
        "& fieldset legend": {
          display: "none",
        },
        "& label": {
          top: "-10px",
          fontSize: "14px",
        },
        "& .MuiInputLabel-shrink": {
          top: "-4px",
          background: "#fff",
        },
      }}
      data={[
        { label: "All", value: "all" },
        // { label: "Pending Live", value: "pendingLive" },
        { label: "Pending Catalog", value: "pendingCatalog" },
        // { label: "Catlog Created", value: "cataLogCreated" },
        { label: "Live", value: "live" },
      ]}
    />
  );
};

export default CatlogDropdown;
