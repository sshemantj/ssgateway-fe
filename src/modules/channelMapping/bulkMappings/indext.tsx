import React from "react";
import styles from "./bulkChannelMappings.module.scss";
import { Box } from "@mui/material";

const BulkChannelMappings = () => {
  return (
    <div className={styles.bulkMappingsWrapper}>
      <Box className={styles.bulkMappings_inner}></Box>
    </div>
  );
};

export default BulkChannelMappings;
