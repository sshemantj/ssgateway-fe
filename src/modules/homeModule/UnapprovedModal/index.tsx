import React from "react";
import styles from "./unapprovedModal.module.scss";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface IUnapprovedModal {
  handleCancel: () => void;
  currSelectedRow: any;
}

const UnapprovedModal = (props: IUnapprovedModal) => {
  const { handleCancel, currSelectedRow } = props;

  const handleApprove = () => {};

  const tableHeadingList = ["code", "description", "material"];

  const handleTableCellBody = (item: any) => {
    return typeof currSelectedRow[item] !== "object"
      ? currSelectedRow[item]
      : "";
  };

  return (
    <div className={styles.unapprovedModalWrapper}>
      <div className={styles.unapprovedInner}>
        <div className={styles.headingContainer}>
          <p className={styles.confirmation}>
            are you sure you want to <br />
            approve?
          </p>
          <div className={styles.productDetails}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeadingList.map((item, index) => {
                      return <TableCell key={index}>{item}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableHeadingList.map((item, index) => {
                    return (
                      <TableCell key={index}>
                        {handleTableCellBody(item)}
                      </TableCell>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            onClick={() => handleApprove()}
            variant="contained"
            color="info"
          >
            Approve
          </Button>
          <Button
            onClick={() => handleCancel()}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnapprovedModal;
