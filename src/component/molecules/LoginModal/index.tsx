import React, { useState } from "react";
import { Grid, TextField, Paper, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomModal from "../CustomModal";
import styles from "./login.module.scss";

const LoginComponent = () => {
  const [open, setOpen] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    // router.push(processScreenRoutes.);
  };

  return (
    <CustomModal {...{ open, setOpen, showClose: false }}>
      <div className={styles.loginWrapper}>
        <div style={{ padding: 30, height: "100%" }}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              container
              width={"100%"}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h5" m={1} fontWeight={500}>
                Login
              </Typography>
              <Grid item xs={12} margin={"0 0 1rem 0"}>
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
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type={"password"}
                />
              </Grid>
              <Grid item xs={12} width={"310px"}>
                <Button
                  fullWidth
                  onClick={() => handleLogin()}
                  sx={{ width: "100%", margin: "1rem 0" }}
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </CustomModal>
  );
};

export default LoginComponent;
