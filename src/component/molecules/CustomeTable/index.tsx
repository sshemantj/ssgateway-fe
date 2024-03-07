import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NestedTable from "../nestedTable";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentProduct } from "@/store/slices/gatewaySlice";
import CustomModal from "../CustomModal";
import { Box } from "@mui/material";
import styles from "./customtable.module.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  pt: 2,
  px: 4,
  pb: 3,
};

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
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleRowClick = (item: any, index: number) => {
    dispatch(setCurrentProduct(item));
    setOpen((prev: any) => {
      return {
        [index]: prev[index] ? false : true,
      };
    });
    handleModalOpen();
  };

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
                className={`${styles.tableRow} ${open[index] && styles.open}`}
                onClick={() => handleRowClick(row, index)}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <NestedTable primary component="th" scope="row">
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
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </CustomModal>
    </div>
  );
};

export default CustomTable;
