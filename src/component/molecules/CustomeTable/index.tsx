import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NestedTable from "../nestedTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentProduct } from "@/store/slices/gatewaySlice";
import CustomModal from "../CustomModal";
import { Box } from "@mui/material";
import styles from "./customtable.module.scss";
import ModalComponent from "@/modules/demoModule/modalComponent";

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

  const apiRes = useAppSelector((state) => state.gateway.value.products);
  const keysArray = Object.keys(apiRes?.[0])?.filter(
    (item) => item !== "styleVariants"
  );
  console.log(apiRes);

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
              {keysArray.map((item) => {
                return <TableCell align="center">{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {apiRes.map((row: any, index: number) => {
              return (
                <TableRow
                  className={`${styles.tableRow} ${open[index] && styles.open}`}
                  onClick={() => handleRowClick(row, index)}
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {keysArray.map((item) => {
                    return (
                      <NestedTable
                        style={{ whiteSpace: "nowrap" }}
                        align="center"
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
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <ModalComponent />
      </CustomModal>
    </div>
  );
};

export default CustomTable;
