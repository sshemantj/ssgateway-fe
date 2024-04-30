import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { checkEmtyObj } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IUpdateProfile, updateProfile } from "@/services/thunks/tableApis";
import styles from "./updateProfile.module.scss";
import { getUserDetails } from "@/services/thunks/loginApi";

const UpdateProfile = () => {
  const [allinputState, setAllInputState] = useState({
    email: "",
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.login.userDetails?.id);
  const userName =
    useAppSelector((state) => state.login.userDetails?.userName) || "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;

    setAllInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceed = () => {
    const isEmtyFieldAvailable = checkEmtyObj(allinputState);
    if (!isEmtyFieldAvailable) {
      const payload: IUpdateProfile = {
        id: userId,
        email: allinputState.email,
        isactive: true,
      };

      dispatch(updateProfile(payload)).then(() => {
        toast.success("Profile update successfully!", {
          position: "top-right",
          duration: 2000,
        });
        dispatch(getUserDetails(userName));
      });
    } else {
      toast.error("Please fill all values!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className={styles.updateProfile_wrapper}>
      <Grid container spacing={2} className={styles.updateProfile_pass_inner}>
        <Grid item xs={12} md={12}>
          <Typography align="center" className={styles.title} variant="h5">
            Update Profile
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
            size="small"
            type="text"
            name="email"
            label="User Id"
            value={userId}
            fullWidth
            disabled
          />
          <TextField
            size="small"
            type="text"
            name="email"
            label="Username"
            value={userName}
            fullWidth
            disabled
          />
          <TextField
            size="small"
            type="text"
            name="email"
            label="Enter email..."
            value={allinputState.email}
            onChange={handleChange}
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item width="100%" display="flex" justifyContent="center">
          <Button onClick={() => handleProceed()} variant="contained">
            Proceed
          </Button>
        </Grid>
      </Grid>
      <Toaster />
    </div>
  );
};

export default UpdateProfile;
