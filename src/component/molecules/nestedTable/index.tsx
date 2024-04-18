import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import styles from "./nestedtable.module.scss";

interface IProps extends TableCellProps {
  children: string | number | JSX.Element;
  primary?: boolean;
}

const NestedTable = (props: IProps) => {
  const { children, primary = false, ...rest } = props;

  const handleStrChildren = (str: string) => {
    if (str.length > 30) {
      return str.slice(0, 27) + "...";
    }
    return str;
  };

  const renderedChildren =
    typeof children === "string" ? handleStrChildren(children) : children;

  return (
    <TableCell className={`${styles.tableCellMain}`} {...rest}>
      <span>{renderedChildren}</span>
    </TableCell>
  );
};

export default NestedTable;
