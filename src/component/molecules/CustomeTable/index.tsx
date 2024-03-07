import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NestedTable from "../nestedTable";
import styles from "./customtable.module.scss";

interface IProps {
  theadArr: any[];
  tbodyArr: any[];
  handleRowClick: (row: any, index: number) => void;
  open?: any;
  handleSingleRowClick?: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    key: string,
    value: any
  ) => void;
}

const CustomTable = (props: IProps) => {
  const {
    theadArr,
    tbodyArr,
    handleRowClick,
    open = {},
    handleSingleRowClick = () => {},
  } = props;
  return (
    <div className={styles.customTableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {theadArr.map((item) => {
                return <TableCell align="center">{item}</TableCell>;
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
                  {theadArr.map((item) => {
                    return (
                      <NestedTable
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
                        onClick={(e) =>
                          handleSingleRowClick(e, item, row[item])
                        }
                      >
                        {row[item] || "-"}
                      </NestedTable>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
