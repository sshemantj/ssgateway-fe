import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import MapUserChannelModule from "@/modules/mapUserModule";

const MapUserWithChannels: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <MapUserChannelModule />
      </MainLayout>
    </>
  );
};

export default MapUserWithChannels;
