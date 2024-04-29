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
import toast, { Toaster } from "react-hot-toast";
import styles from "./addChannel.module.scss";

interface IProps {}

const AddChannels = (props: IProps) => {
  const {} = props;

  const dispatch = useAppDispatch();

  const [allinputState, setAllInputState] = useState<
    ICreateChannelPayload["payload"]
  >({
    channelid: "",
    channelname: "",
    description: "",
    isactive: true,
  });

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
        toast.success("Channel created successfully!", {
          position: "top-right",
          duration: 2000,
        });
      });
    } else {
      toast.error("Please fill all values!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <Box className={styles.createChannel_wrapper}>
      <Grid container spacing={2} className={styles.createChannel_inner}>
        <Grid item xs={12} md={12}>
          <Typography className={styles.title} variant="h5">
            Create channel
          </Typography>
        </Grid>
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          xs={12}
          md={12}
        >
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
          {/* <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
                checked={allinputState.isactive}
                value="true"
                control={<Radio />}
                label="True"
              />
              <FormControlLabel
                checked={!allinputState.isactive}
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl> */}
        </Grid>
        <Grid item xs={4} width={"310px"}>
          <Button
            fullWidth
            onClick={() => handleProceed()}
            sx={{ width: "100%" }}
            variant="contained"
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
      <Toaster />
    </Box>
  );
};

export default AddChannels;
