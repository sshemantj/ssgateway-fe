import React, { useState } from "react";
import { IAllRoutes, ISubRoutes } from "@/constants/allRoutes";
import AddChannels from "./addChannel";
import styles from "./manageChannels.module.scss";

type IScreenType = ISubRoutes[IAllRoutes.MANAGE_CHANNELS];

const ManageChannelsModules = () => {
  const [currScree, setCurrScreen] = useState<IScreenType>();

  return (
    <div className={styles.manageChannels_wrapper}>
      <AddChannels />
    </div>
  );
};

export default ManageChannelsModules;
