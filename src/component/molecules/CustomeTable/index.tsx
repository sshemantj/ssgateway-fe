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
import styles from "./customtable.module.scss";
import MultiSelectDropdown from "../multiSelectDropdown";
import { useAppDispatch } from "@/store/hooks";
import { getChannelMasters } from "@/services/thunks/tableApis";

interface IProps {
  theadArr: any[];
  tbodyArr: any[];
  handleRowClick?: (row: any, index: number) => void;
  open?: any;
  isMultiSelects?: boolean;
  allCheckBox?: any;
  handlePagination?: (pageNumber: number) => void;
  showPagination?: boolean;
  setselectedChannels?: React.Dispatch<any>;
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
    allCheckBox = {},
    isMultiSelects = false,
    handlePagination = () => {},
    showPagination = false,
    setselectedChannels,
    selectedChannels,
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
            "check",
            "channel mapping",
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
                    <>
                      <NestedTable
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
                      >
                        <Checkbox
                          checked={
                            Boolean(allCheckBox?.[index]) ||
                            handleChannel(index)
                          }
                        />
                      </NestedTable>
                      <NestedTable
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
                      >
                        <MultiSelectDropdown
                          {...{
                            selectedChannels,
                            setselectedChannels,
                            index,
                          }}
                        />
                      </NestedTable>
                    </>
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
          onChange={(_, page) => handlePagination(page)}
          sx={{ "& .MuiPagination-ul li:nth-child(8)": { display: "none" } }}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default CustomTable;
