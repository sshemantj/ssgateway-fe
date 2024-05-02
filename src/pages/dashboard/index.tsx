import MainLayout from "@/layout/MainLayout";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <HomeModule />
      </MainLayout>
    </>
  );
};

export default Dashboard;
