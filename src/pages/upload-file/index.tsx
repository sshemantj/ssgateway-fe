import React from "react";
import UploadFileModule from "@/modules/uploadModule";
import MainLayout from "@/layout/MainLayout";

const UploadFile = () => {
  return (
    <MainLayout shouldNavOpen={false}>
      <UploadFileModule />
    </MainLayout>
  );
};

export default UploadFile;
