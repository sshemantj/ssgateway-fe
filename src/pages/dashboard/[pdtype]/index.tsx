import MainLayout from "@/layout/MainLayout";
import DashboardModule from "@/modules/dashboardModule";
import { NextPage } from "next";
import Head from "next/head";

const PdTypes: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <DashboardModule />
      </MainLayout>
    </>
  );
};

export default PdTypes;
