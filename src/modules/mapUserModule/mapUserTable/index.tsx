import React, { useMemo } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NestedTable from "@/component/molecules/nestedTable";
import styles from "./mapUserTable.module.scss";

interface IProps {
  theadArr: any[];
  tbodyArr: any[];
  open?: any;
  handleHeaderClick?: (item: any) => void;
  handleRowClick: (item: any, index: number) => void;
}

const MapUserTable = (props: IProps) => {
  const { theadArr, handleHeaderClick, tbodyArr, handleRowClick, open } = props;

  const excludedFields = ["check"];

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
    () => [
      ...(theadArr.length ? ["check"] : []),
      ...theadArr.filter((item) => ![""].includes(item)),
    ],
    [theadArr]
  );

  return (
    <TableContainer
      sx={{
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.tableHeader_wappper}>
            {customTheadArr.map((item, index) => {
              return (
                <TableCell
                  style={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                    cursor: "pointer",
                  }}
                  key={index}
                  align="center"
                >
                  {item === "check" ? (
                    <Checkbox
                      onClick={() => handleHeaderClick?.(item)}
                      sx={{
                        "& svg": { color: "white !important" },
                      }}
                    />
                  ) : (
                    item
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tbodyArr && tbodyArr?.length ? null : (
            <div className={styles.notFound}>
              <h2>No records found!</h2>
            </div>
          )}

          {tbodyArr.map((row: any, index: number) => {
            return (
              <TableRow
                key={`${row.name}${index}`}
                className={`${styles.tableRow} ${
                  open?.[row.id] && styles.open
                }`}
                onClick={() => handleRowClick(row, index)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <NestedTable
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    span: {
                      padding: "0",
                    },
                  }}
                >
                  <Checkbox checked={Boolean(open?.[row.id])} />
                </NestedTable>
                {customTheadArr
                  .filter((item) => !excludedFields.includes(item))
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
  );
};

export default MapUserTable;
