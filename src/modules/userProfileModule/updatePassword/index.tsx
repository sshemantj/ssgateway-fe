import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { checkEmtyObj } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IUpdatePassword, updatePassword } from "@/services/thunks/tableApis";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./updatePassword.module.scss";

interface IPass {
  newPassword: boolean;
  oldPassword: boolean;
}

const UpdatePassword = () => {
  const [allinputState, setAllInputState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.login.userDetails?.id);

  const [showPassword, setShowPassword] = useState<IPass>({
    newPassword: false,
    oldPassword: false,
  });

  const handleClickShowPassword = (name: keyof IPass) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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
      const payload: IUpdatePassword = {
        userId,
        oldPassword: allinputState.oldPassword,
        newPassword: allinputState.newPassword,
      };

      dispatch(updatePassword(payload)).then(() => {
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
    <div className={styles.updatePassword_wrapper}>
      <Grid container spacing={2} className={styles.update_pass_inner}>
        <Grid item xs={12} md={12}>
          <Typography align="center" className={styles.title} variant="h5">
            Update password
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
            type={showPassword.oldPassword ? "text" : "password"}
            name="oldPassword"
            label="Old Password"
            value={allinputState.oldPassword}
            onChange={handleChange}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("oldPassword")}
                    edge="end"
                  >
                    {showPassword.oldPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            size="small"
            type={showPassword.newPassword ? "text" : "password"}
            name="newPassword"
            label="New Password"
            value={allinputState.newPassword}
            onChange={handleChange}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("newPassword")}
                    edge="end"
                  >
                    {showPassword.newPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

export default UpdatePassword;
