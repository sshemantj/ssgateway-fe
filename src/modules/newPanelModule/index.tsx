import { Grid } from "@mui/material";
import React from "react";
import HomeModule from "../homeModule";

const NewPanelModule = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid sm={12} md={12} item width="100%">
        <HomeModule />
      </Grid>
    </Grid>
  );
};

export default NewPanelModule;
