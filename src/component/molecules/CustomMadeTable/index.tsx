import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./customMadeTable.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { updateHeights } from "@/store/slices/gatewaySlice";

interface IProps {
  level?: number;
}

const CustomMadeTable = (props: IProps) => {
  const { level = 1 } = props;
  const [open, setOpen] = useState<any>({});
  const [alreadyClicked, setAlreadyClicked] = useState<any>(false);
  const [currHeight, setCurrHeight] = useState<number>(0);

  const { allHeights } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();

  const divRef = useRef<any>(null);

  const getUpdatedHeight = () => {
    return {
      ...allHeights,
      level: {
        ...allHeights.level,
        [level]: currHeight,
      },
    };
  };

  const handleAccordionOnOpen = (
    updatedHeights: any,
    isCurrentlyOpen: boolean
  ) => {
    if (!isCurrentlyOpen) {
      if (level === 2 && !isCurrentlyOpen && !alreadyClicked) {
        console.log("it ran 1");
        updatedHeights.level["1"] += updatedHeights.level["2"];
        setAlreadyClicked(true);
      }
      if (level === 3 && !isCurrentlyOpen) {
        updatedHeights.level["1"] += updatedHeights.level["2"];
        updatedHeights.level["2"] += updatedHeights.level["3"];
      }
    }
  };

  const handleAccordionOnClose = (
    updatedHeights: any,
    isCurrentlyOpen: boolean
  ) => {
    if (isCurrentlyOpen) {
      // console.log(updatedHeights.level, currHeight);
      if (level === 2 && isCurrentlyOpen) {
        updatedHeights.level["1"] -= currHeight;
        console.log("it ran 2");
      }
      if (level === 3 && isCurrentlyOpen) {
        updatedHeights.level["1"] -= currHeight;
        updatedHeights.level["2"] -= currHeight;
      }
    }
  };

  const handleClick = (index: number) => {
    const handleSetOpen = (prev: any) => {
      const isCurrentlyOpen = prev[index];

      const updatedHeights = getUpdatedHeight();
      handleAccordionOnOpen(updatedHeights, isCurrentlyOpen);
      handleAccordionOnClose(updatedHeights, isCurrentlyOpen);

      // dispatch(updateHeights(updatedHeights));

      return { [index]: isCurrentlyOpen ? false : true };
    };
    setOpen(handleSetOpen);
  };

  const handleBgColor = () => {
    switch (level) {
      case 1:
        return { background: "lightblue" };
      case 2:
        return { background: "lightgreen" };
      case 3:
        return { background: "lightcoral" };
      default:
        return { background: "black" };
    }
  };

  useEffect(() => {
    if (divRef && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      let height = rect.height + 20;
      setCurrHeight(height);
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      style={handleBgColor()}
      className={styles.customMadeTable}
    >
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
                    height: open[ind]
                      ? `${allHeights.level[level]}px`
                      : "unset",
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
                      <CustomMadeTable level={level ? level + 1 : 1} />
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
