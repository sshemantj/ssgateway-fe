import NewNavBar from "@/component/molecules/NewNavbar";
import DemoModule from "@/modules/demoModule";
import { NextPage } from "next";

const DemoPage: NextPage = () => {
  return (
    <NewNavBar>
      <DemoModule />
    </NewNavBar>
  );
};

export default DemoPage;
