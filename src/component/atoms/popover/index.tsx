import React from "react";
import Popover from "@mui/material/Popover";

interface IProps {
  children: React.ReactElement;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

const PopoverCustom = (props: IProps) => {
  const { children, anchorEl, setAnchorEl } = props;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {children}
    </Popover>
  );
};

export default PopoverCustom;
