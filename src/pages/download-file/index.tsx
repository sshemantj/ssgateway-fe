import React from "react";
import DownloadFileModule from "@/modules/downloadModule";
import Navbar from "@/component/molecules/Navbar";
import MainLayout from "@/layout/MainLayout";

const DownloadFile = () => {
  return (
    <div>
      <Navbar />
      <MainLayout>
        <DownloadFileModule />
      </MainLayout>
    </div>
  );
};

export default DownloadFile;
