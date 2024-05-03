import React from "react";
import { useSearchParams } from "next/navigation";
import { IChannelMappingSubRoutes } from "@/constants/allRoutes";
import MapUserChannel from "./mapUserChannel";
import styles from "./channelMappings.module.scss";

const ChannelMappings = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.fileManagement_wrapper}>
      {screen === IChannelMappingSubRoutes.MAP_CHANNEL ? (
        <MapUserChannel />
      ) : null}
    </div>
  );
};

export default ChannelMappings;
