import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import ManageChannelsModules from "@/modules/manageChannels";

const ManageChannels: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <ManageChannelsModules />
      </MainLayout>
    </>
  );
};

export default ManageChannels;
