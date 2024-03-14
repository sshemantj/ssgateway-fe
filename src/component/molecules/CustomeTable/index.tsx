import React, { useMemo } from "react";
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
  showPagination?: boolean;
}

const CustomTable = (props: IProps) => {
  const {
    theadArr,
    tbodyArr,
    handleRowClick = () => {},
    open = {},
    allCheckBox = {},
    isMultiSelects = false,
    handlePagination = () => {},
    showPagination = false,
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

  const customTheadArr = useMemo(
    () => (isMultiSelects ? ["check", ...theadArr] : theadArr),
    [theadArr]
  );

  return (
    <div className={styles.customTableWrapper}>
      <TableContainer
        sx={{
          height: "70vh",
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {customTheadArr.map((item, index) => {
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
                  key={`${row.name}${index}`}
                  className={`${styles.tableRow} ${
                    open?.[index] && styles.open
                  }`}
                  onClick={() => handleRowClick(row, index)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {isMultiSelects ? (
                    <NestedTable
                      style={{ whiteSpace: "nowrap" }}
                      align="center"
                    >
                      <Checkbox checked={Boolean(allCheckBox?.[index])} />
                    </NestedTable>
                  ) : null}
                  {customTheadArr
                    .filter((item) => item !== "check")
                    .map((item, index2) => {
                      return (
                        <NestedTable
                          key={index2}
                          style={{ whiteSpace: "nowrap" }}
                          align="center"
                        >
                          {handleRowValue(row[item])}
                        </NestedTable>
                      );
                    })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Pagination
          onChange={(_, page) => handlePagination(page)}
          sx={{ "& .MuiPagination-ul li:nth-child(8)": { display: "none" } }}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default CustomTable;
