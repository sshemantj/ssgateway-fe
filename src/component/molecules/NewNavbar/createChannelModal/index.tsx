import React from "react";
import styles from "./createChannel.module.scss";

interface IProps {
  openCreateChannel: boolean;
  setOpenCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChannelModal = (props: IProps) => {
  const { openCreateChannel, setOpenCreateChannel } = props;
  return openCreateChannel ? <div>create_channel</div> : null;
};

export default CreateChannelModal;
