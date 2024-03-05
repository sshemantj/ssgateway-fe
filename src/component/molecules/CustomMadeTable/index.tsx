import React from "react";
import styles from "./customMadeTable.module.scss";

const CustomMadeTable = () => {
  return (
    <div className={styles.customMadeTable}>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>age</td>
            <td>occupation</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hemant</td>
            <td>25</td>
            <td>developer</td>
          </tr>
          <tr>
            <td>hemant</td>
            <td>25</td>
            <td>developer</td>
          </tr>
          <tr>
            <td>hemant</td>
            <td>25</td>
            <td>developer</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomMadeTable;
