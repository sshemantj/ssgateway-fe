import MainLayout from "@/layout/MainLayout";
import StoreMapping from "@/modules/storeMapping";
import { NextPage } from "next";
import Head from "next/head";

const MapUserWithStore: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <StoreMapping />
      </MainLayout>
    </>
  );
};

export default MapUserWithStore;
