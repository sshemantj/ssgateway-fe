import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import MainLayout from "@/layout/MainLayout";
import UserProfileModule from "@/modules/userProfileModule";

const UserProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <MainLayout>
        <UserProfileModule />
      </MainLayout>
    </>
  );
};

export default UserProfile;
