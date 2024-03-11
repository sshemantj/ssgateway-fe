import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NestedTable from "../nestedTable";
import Checkbox from "@mui/material/Checkbox";
import { Pagination } from "@mui/material";
import styles from "./customtable.module.scss";

interface IProps {
  theadArr: any[];
  tbodyArr: any[];
  handleRowClick?: (row: any, index: number) => void;
  open?: any;
  isMultiSelects?: boolean;
  allCheckBox?: any;
  handlePagination?: (pageNumber: number) => void;
  handleSingleRowClick?: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    key: string,
    value: any,
    index: number
  ) => void;
}

const CustomTable = (props: IProps) => {
  const {
    theadArr,
    tbodyArr,
    handleRowClick = () => {},
    open = {},
    allCheckBox = {},
    isMultiSelects = false,
    handleSingleRowClick = () => {},
    handlePagination = () => {},
  } = props;

  const handleRowValue = (row: any) => {
    switch (row) {
      case false:
      case true:
      case null:
        return JSON.stringify(row);
      case "":
        return "-";
      default:
        return row;
    }
  };

  return (
    <div className={styles.customTableWrapper}>
      <TableContainer style={{ height: "80vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {theadArr.map((item, index) => {
                return (
                  <TableCell key={index} align="center">
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tbodyArr.map((row: any, index: number) => {
              return (
                <TableRow
                  className={`${styles.tableRow} ${
                    open?.[index] && styles.open
                  }`}
                  onClick={() => handleRowClick(row, index)}
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {theadArr.map((item, index2) => {
                    return (
                      <NestedTable
                        key={index2}
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
                        onClick={(e) =>
                          handleSingleRowClick(e, item, row[item], index)
                        }
                      >
                        <>
                          {isMultiSelects && (
                            <Checkbox
                              checked={Boolean(allCheckBox?.[index]?.[item])}
                            />
                          )}
                          {handleRowValue(row[item])}
                        </>
                      </NestedTable>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        onChange={(_, page) => handlePagination(page)}
        count={Number.MAX_SAFE_INTEGER}
        sx={{ "& .MuiPagination-ul li:nth-child(8)": { display: "none" } }}
        variant="outlined"
      />
    </div>
  );
};

export default CustomTable;
