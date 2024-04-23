import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  ICreateChannelPayload,
  createChannelMaster,
} from "@/services/thunks/tableApis";
import { useAppDispatch } from "@/store/hooks";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./createChannel.module.scss";
import CustomModal from "@/component/molecules/CustomModal";

interface IProps {
  openCreateChannel: boolean;
  setOpenCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChannelModal = (props: IProps) => {
  const { openCreateChannel, setOpenCreateChannel } = props;

  const dispatch = useAppDispatch();

  const [allinputState, setAllInputState] = useState<
    ICreateChannelPayload["payload"]
  >({
    channelid: "",
    channelname: "",
    description: "",
    isactive: true,
  });

  const handleModalClose = () => {
    setOpenCreateChannel(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "isactive") value = JSON.parse(value);
    setAllInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkEmpty = (obj: ICreateChannelPayload["payload"]) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // @ts-ignore
        if (typeof obj[key] === "boolean") {
          continue;
        }
        // @ts-ignore
        if (!obj[key]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleProceed = () => {
    const isEmtyFieldAvailable = checkEmpty(allinputState);
    if (!isEmtyFieldAvailable) {
      dispatch(createChannelMaster({ payload: allinputState })).then(() => {
        toast.success("Channel created successfully!");
      });
    } else {
      toast.warn("Please fill all values!");
    }
  };

  return openCreateChannel ? (
    <CustomModal
      {...{
        open: openCreateChannel,
        handleModalClose,
        showClose: false,
      }}
    >
      <Box className={styles.createChannel_wrapper}>
        <Grid
          container
          width={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          className={styles.createChannel_inner}
          spacing={2}
        >
          <Typography variant="h5" m={1} fontWeight={500}>
            Create channel
          </Typography>
          <Grid item xs={12} md={6}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "280px",
                  height: "0.4rem",
                },
              }}
              onChange={handleChange}
              value={allinputState.channelid}
              name="channelid"
              label="Channel Id"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "280px",
                  height: "0.4rem",
                },
              }}
              onChange={handleChange}
              value={allinputState.channelname}
              name="channelname"
              label="Channel Name"
              type={"text"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "280px",
                  height: "0.4rem",
                },
              }}
              value={allinputState.description}
              name="description"
              label="Description"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                isActive
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="isactive"
                onChange={handleChange}
              >
                <FormControlLabel
                  defaultChecked
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} width={"310px"}>
            <Button
              fullWidth
              onClick={() => handleProceed()}
              sx={{ width: "100%" }}
              variant="contained"
            >
              Proceed
            </Button>
          </Grid>
          <CloseIcon
            onClick={() => handleModalClose()}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              opacity: 0.5,
              cursor: "pointer",
            }}
          />
        </Grid>
        <ToastContainer />
      </Box>
    </CustomModal>
  ) : null;
};

export default CreateChannelModal;
