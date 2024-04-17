import NewNavBar from "@/component/molecules/NewNavbar";
import DemoModule from "@/modules/demoModule";
import { NextPage } from "next";
import Head from "next/head";

const DemoPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <NewNavBar>
        <DemoModule />
      </NewNavBar>
    </>
  );
};

export default DemoPage;
