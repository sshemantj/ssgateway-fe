import { Grid } from "@mui/material";
import React from "react";
import HomeModule from "../homeModule";
import { useAppSelector } from "@/store/hooks";

const NewPanelModule = () => {
  const pdType = useAppSelector((state) => state.gateway?.pdType);
  return (
    <Grid container spacing={2} width="100%">
      <Grid sm={12} md={12} item width="100%">
        {pdType !== "" ? <HomeModule /> : null}
      </Grid>
    </Grid>
  );
};

export default NewPanelModule;
