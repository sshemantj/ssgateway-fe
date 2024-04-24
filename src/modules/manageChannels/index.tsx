import React, { useState } from "react";
import { IAllSubRoutes } from "@/constants/allRoutes";
import AddChannels from "./addChannel";
import { useSearchParams } from "next/navigation";
import styles from "./manageChannels.module.scss";
import UpdateChannel from "./updateChannel";

// type IScreenType = ISubRoutes[IAllRoutes.MANAGE_CHANNELS];

const ManageChannelsModules = () => {
  // const [currScreen, setCurrScreen] = useState<IScreenType>();

  const searchParams = useSearchParams();

  const screen = searchParams.get("screen");

  return (
    <div className={styles.manageChannels_wrapper}>
      {screen === IAllSubRoutes.ADD_CHANNEL ? <AddChannels /> : null}
      {screen === IAllSubRoutes.UPDATE_CHANNEL ? <UpdateChannel /> : null}
    </div>
  );
};

export default ManageChannelsModules;
