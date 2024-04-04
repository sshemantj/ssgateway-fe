import React from "react";
import UploadFileModule from "@/modules/uploadModule";
import Navbar from "@/component/molecules/Navbar";

const UploadFile = () => {
  return (
    <div>
      <Navbar />
      <UploadFileModule />
    </div>
  );
};

export default UploadFile;
