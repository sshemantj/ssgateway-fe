import MainLayout from "@/layout/MainLayout";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const UserProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <div>UserProfile</div>
      </MainLayout>
    </>
  );
};

export default UserProfile;
