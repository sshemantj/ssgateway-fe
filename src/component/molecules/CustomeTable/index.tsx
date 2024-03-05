import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./customtable.module.scss";
import NestedTable from "../nestedTable";

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CustomTable = () => {
  const [open, setOpen] = useState<any>({});
  const [currInd, setCurrInd] = useState<number>(0);

  console.log(open);
  return (
    <div className={styles.customTableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                onClick={() => {
                  setCurrInd(index);
                  setOpen((prev: any) => {
                    return {
                      ...prev,
                      [index]: prev[index] ? false : true,
                    };
                  });
                }}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <NestedTable
                  //   index={index}
                  open={open[index]}
                  //   setOpen={setOpen}
                  primary
                  component="th"
                  scope="row"
                >
                  {row.name}
                </NestedTable>
                <NestedTable align="right">{row.calories}</NestedTable>
                <NestedTable align="right">{row.fat}</NestedTable>
                <NestedTable align="right">{row.carbs}</NestedTable>
                <NestedTable align="right">{row.protein}</NestedTable>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open[currInd] && <CustomTable />}
    </div>
  );
};

export default CustomTable;
