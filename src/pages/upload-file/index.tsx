import React from "react";
import UploadFileModule from "@/modules/uploadModule";
import NewNavBar from "@/component/molecules/NewNavbar";

const UploadFile = () => {
  return (
    <NewNavBar shouldNavOpen={false}>
      <UploadFileModule />
    </NewNavBar>
  );
};

export default UploadFile;
