import MainLayout from "@/layout/MainLayout";
import NewPanelModule from "@/modules/newPanelModule";
import { NextPage } from "next";
import Head from "next/head";

const NewPanel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <NewPanelModule />
      </MainLayout>
    </>
  );
};

export default NewPanel;
