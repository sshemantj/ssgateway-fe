import React, { ChangeEvent, useState } from "react";
import styles from "./login.module.scss";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";

const LoginModule = () => {
  const [checked, setChecked] = useState(true);
  const [username, setUserName] = useState("dummyUser");
  const [password, setPassword] = useState("dummyPass");

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleLogin = () => {
    // router.push(processScreenRoutes.);
  };

  return (
    <div className={styles.loginWrapper}>
      <div style={{ padding: 30 }}>
        <Paper>
          <Grid
            container
            // spacing={3}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" m={1} fontWeight={500}>
              Login
            </Typography>
            <Grid item xs={12} margin={"0 0 1rem 0"}>
              <TextField
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type={"password"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
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
  );
};

export default LoginModule;
