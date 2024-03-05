import React from "react";
import styles from "./treeGateway.module.scss";
import TreeBox from "@/component/atoms/treeBox";
import { useAppSelector } from "@/store/hooks";

interface IProps {}

const TreeGateway = (props: IProps) => {
  const pdjson = useAppSelector((state) => state.gateway.value);
  console.log(pdjson);
  return (
    <div className={styles.treeGatewayWrapper}>
      <TreeBox />
    </div>
  );
};

export default TreeGateway;
