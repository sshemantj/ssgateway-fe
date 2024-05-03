import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import ChannelMappings from "@/modules/channelMapping/mapUserChannel";

const MapUserWithChannels: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <ChannelMappings />
      </MainLayout>
    </>
  );
};

export default MapUserWithChannels;
