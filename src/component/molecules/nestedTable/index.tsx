import React, { useState } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./nestedtable.module.scss";
import CustomTable from "../CustomeTable";

interface IProps extends TableCellProps {
  children: string | number;
  primary?: boolean;
  open?: boolean;
  //   index?: number;
  //   setOpen?: React.Dispatch<React.SetStateAction<any>>;
}

const NestedTable = (props: IProps) => {
  const {
    children,
    primary = false,
    // index,
    open = false,
    // setOpen = () => {},
    ...rest
  } = props;

  return (
    <TableCell
      // onClick={() => setOpen(prev => ({prev[index]: Boolean(prev[index])}))}
      className={styles.tableCellMain}
      {...rest}
    >
      {primary && (
        <KeyboardArrowUpIcon
          className={`${styles.plusIcon} ${open ? styles.open : styles.close}`}
        />
      )}
      <span>{children}</span>
    </TableCell>
  );
};

export default NestedTable;
