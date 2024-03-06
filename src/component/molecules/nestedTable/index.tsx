import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import styles from "./nestedtable.module.scss";

interface IProps extends TableCellProps {
  children: string | number;
  primary?: boolean;
}

const NestedTable = (props: IProps) => {
  const { children, primary = false, ...rest } = props;
  return (
    <TableCell className={`${styles.tableCellMain}`} {...rest}>
      <span>{children}</span>
    </TableCell>
  );
};

export default NestedTable;
