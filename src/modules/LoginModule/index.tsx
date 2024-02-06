import React, { ChangeEvent, useState } from "react";
import styles from "./login.module.scss";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
} from "@mui/material";

const LoginModule = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
            <Grid item xs={12} margin={"0 0 1rem 0"}>
              <TextField label="Username"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" type={"password"}></TextField>
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
