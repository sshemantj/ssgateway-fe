import NewNavBar from "@/component/molecules/NewNavbar";
import { NextPage } from "next";

const DemoPage: NextPage = () => {
  return (
    <>
      <NewNavBar>
        <div>main content</div>
      </NewNavBar>
    </>
  );
};

export default DemoPage;
