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
import styles from "./customtable.module.scss";
import SelectDropdown from "../selectDropdown";

const categoryDB = [
  {
    label: "Desktop PC",
    value: 1,
  },
  {
    label: "Notebook",
    value: 2,
  },
  {
    label: "Monitor",
    value: 3,
  },
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
      <CustomModal
        closeIconStyle={{ top: "1rem", right: "1rem" }}
        open={openModal}
        setOpen={setOpenModal}
      >
        <div>
          <SelectDropdown label="Select StyleVariants" data={categoryDB} />
        </div>
      </CustomModal>
      {/* <CustomModal open={openModal} setOpen={setOpenModal}>
        <ModalComponent />
      </CustomModal> */}
    </div>
  );
};

export default CustomTable;
