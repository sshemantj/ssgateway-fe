import { Grid } from "@mui/material";
import React from "react";
import HomeModule from "../homeModule";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import cloudSvg from "@/images/cloud.svg";

const NewPanelModule = () => {
  const pdType = useAppSelector((state) => state.gateway?.pdType);
  return (
    <Grid container spacing={2} width="100%">
      <Grid sm={12} md={12} item width="100%">
        {pdType !== "" ? (
          <HomeModule />
        ) : (
          <Image
            style={{
              margin: "3.5rem 0 0 0",
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
            }}
            src={cloudSvg}
            alt="cloud"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default NewPanelModule;
