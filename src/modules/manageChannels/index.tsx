import React, { useState } from "react";
import { IAllSubRoutes } from "@/constants/allRoutes";
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
      {screen === IAllSubRoutes.ADD_CHANNEL ? <AddChannels /> : null}
      {screen === IAllSubRoutes.UPDATE_CHANNEL ? <UpdateChannel /> : null}
      {screen === IAllSubRoutes.VIEW_ALL_CHANNEL ? <ViewAllChannel /> : null}
    </div>
  );
};

export default ManageChannelsModules;
