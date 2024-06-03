import React from "react";
import DragDrop from "@/component/atoms/dragAndDrop";
import styles from "./selecting.module.scss";

interface IProps {
  handleChange: (file: File) => void;
}

const Selecting = (props: IProps) => {
  const { handleChange } = props;
  return (
    <div
      className={`${styles["formbold-mb-5"]} ${styles["formbold-file-input"]}`}
    >
      <label>
        <DragDrop {...{ handleChange }}>
          <div>
            <span className={styles["formbold-drop-file"]}>
              Drop CSV files here
            </span>
            <span className={styles["formbold-or"]}> Or </span>
            <span className={styles["formbold-browse"]}>Browse</span>
          </div>
        </DragDrop>
      </label>
    </div>
  );
};

export default Selecting;
