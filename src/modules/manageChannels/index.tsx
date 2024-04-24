import { IAllRoutes, ISubRoutes } from "@/constants/allRoutes";
import CreateChannelModal from "@/layout/MainLayout/createChannelModal";
import React, { useState } from "react";

type IScreenType = ISubRoutes[IAllRoutes.MANAGE_CHANNELS];

const ManageChannelsModules = () => {
  const [currScree, setCurrScreen] = useState<IScreenType>();
  const [openCreateChannel, setOpenCreateChannel] = useState<boolean>(false);

  return (
    <div>
      ManageChannelsModules
      <CreateChannelModal {...{ openCreateChannel, setOpenCreateChannel }} />
    </div>
  );
};

export default ManageChannelsModules;
