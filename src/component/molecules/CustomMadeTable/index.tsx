import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./customMadeTable.module.scss";

interface IProps {
  level?: number;
}

const CustomMadeTable = (props: IProps) => {
  const { level } = props;
  const [open, setOpen] = useState<any>({});
  const [currInd, setCurrInd] = useState<number>();
  const [currHeight, setCurrHeight] = useState<string>("unset");

  const divRef = useRef<any>(null);

  const handleClick = (index: number) => {
    setCurrInd(index);

    const handleSetOpen = (prev: any) => {
      const isCurrentlyOpen = prev[index];

      if (!isCurrentlyOpen && divRef && divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setCurrHeight(`${rect.height}px`);
      }

      return { ...prev, [index]: isCurrentlyOpen ? false : true };
    };
    setOpen(handleSetOpen);
  };

  console.log(open);

  return (
    <div ref={divRef} className={styles.customMadeTable}>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>age</td>
            <td>occupation</td>
          </tr>
        </thead>
        <tbody>
          {[
            {
              name: "hemant",
              age: 25,
              occupation: "dev",
            },
            {
              name: "hemant",
              age: 25,
              occupation: "dev",
            },
            {
              name: "hemant",
              age: 25,
              occupation: "dev",
            },
          ].map((item, ind) => {
            return (
              <>
                <tr key={ind} onClick={() => handleClick(ind)}>
                  <td
                    className={styles.triggerTd}
                    //   onClick={() => setOpen((prev) => !prev)}
                  >
                    <KeyboardArrowUpIcon
                      className={`${styles.arrow} ${
                        open[ind] ? styles.open : styles.close
                      }`}
                    />
                    {item.name}
                  </td>
                  <td>{item.age}</td>
                  <td>{item.occupation}</td>
                </tr>
                <tr
                  style={{
                    position: "relative",
                    height: open[ind] ? currHeight : "unset",
                  }}
                >
                  {open[ind] && (
                    <td
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      <CustomMadeTable level={1} />
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomMadeTable;
