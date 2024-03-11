import React from "react";
import styles from "./treeGateway.module.scss";
import { useAppSelector } from "@/store/hooks";
import CustomTable from "../CustomeTable";

interface IProps {}

const TreeGateway = (props: IProps) => {
  const pdjson = useAppSelector((state) => state.gateway.value);
  console.log(pdjson);
  return (
    <div className={styles.treeGatewayWrapper}>{/* <CustomTable /> */}</div>
  );
};

export default TreeGateway;
