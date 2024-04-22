import React, { useEffect, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NestedTable from "../nestedTable";
import Checkbox from "@mui/material/Checkbox";
import { Pagination } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { getChannelMasters } from "@/services/thunks/tableApis";
import styles from "./customtable.module.scss";

interface IProps {
  theadArr: any[];
  tbodyArr: any[];
  handleRowClick?: (row: any, index: number) => void;
  open?: any;
  isMultiSelects?: boolean;
  handlePagination?: (pageNumber: number) => void;
  showPagination?: boolean;
  totalRecords?: number;
  handleHeaderClick?: (_: string) => void;
  selectedChannels?: {
    value: string[];
  }[];
}

const excludedFields = [
  "check",
  "channel mapping",
  "channelMappings",
  "globalAttributes",
];

const CustomTable = (props: IProps) => {
  const {
    theadArr,
    tbodyArr,
    handleRowClick = () => {},
    open = {},
    isMultiSelects = false,
    handlePagination = () => {},
    showPagination = false,
    totalRecords = 1,
    selectedChannels,
    handleHeaderClick,
  } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMultiSelects) {
      dispatch(getChannelMasters());
    }
  }, [isMultiSelects]);

  const handleRowValue = (row: any) => {
    switch (row) {
      case false:
      case true:
      case null:
        return JSON.stringify(row);
      case "":
        return "-";
      case "channelMappings":
      case "globalAttributes":
        return "";
      default:
        return row;
    }
  };

  const customTheadArr = useMemo(
    () =>
      isMultiSelects
        ? [
            ...(theadArr.length ? ["check"] : []),
            ...theadArr.filter(
              (item) => !["channelMappings", "globalAttributes"].includes(item)
            ),
          ]
        : theadArr,
    [theadArr]
  );

  const handleChannel = (index: number): boolean => {
    const condition = Boolean(selectedChannels?.[index]?.value?.length);
    return condition;
  };

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
            <TableRow className={styles.tableHeader_wappper}>
              {customTheadArr.map((item, index) => {
                return (
                  <TableCell
                    style={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      cursor: "pointer",
                      ...(item === "check"
                        ? { display: "flex", alignItems: "center" }
                        : {}),
                    }}
                    key={index}
                    align="center"
                    onClick={() => handleHeaderClick?.(item)}
                  >
                    {item === "check" ? (
                      <Checkbox
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
                  {isMultiSelects ? (
                    <NestedTable
                      align="center"
                      sx={{
                        whiteSpace: "nowrap",
                        span: {
                          padding: "0",
                        },
                      }}
                    >
                      <Checkbox
                        checked={
                          Boolean(open?.[row.id]) || handleChannel(row.id)
                        }
                      />
                    </NestedTable>
                  ) : null}
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
      {showPagination && (
        <Pagination
          count={totalRecords}
          onChange={(_, page) => handlePagination(page)}
          sx={{
            "& .MuiPagination-ul li:nth-child(8)": { display: "none" },
            transform: "translateX(-5rem)",
            padding: "1rem 0 0 0",
            "@media (max-width: 768px)": {
              transform: "translateX(0rem)",
            },
          }}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default CustomTable;
