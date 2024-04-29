import React, { useState } from "react";
import { IChannelSubRoutes } from "@/constants/allRoutes";
import AddChannels from "./addChannel";
import { useSearchParams } from "next/navigation";
import UpdateChannel from "./updateChannel";
import ViewAllChannel from "./viewAllChannel";
import styles from "./manageChannels.module.scss";

const ManageChannelsModules = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <div className={styles.manageChannels_wrapper}>
      {screen === IChannelSubRoutes.ADD_CHANNEL ? <AddChannels /> : null}
      {screen === IChannelSubRoutes.UPDATE_CHANNEL ? <UpdateChannel /> : null}
      {screen === IChannelSubRoutes.VIEW_ALL_CHANNEL ? (
        <ViewAllChannel />
      ) : null}
    </div>
  );
};

export default ManageChannelsModules;
