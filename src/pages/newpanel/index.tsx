import NewNavBar from "@/component/molecules/NewNavbar";
import NewPanelModule from "@/modules/newPanelModule";
import { NextPage } from "next";
import Head from "next/head";

const NewPanel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <NewNavBar>
        <NewPanelModule />
      </NewNavBar>
    </>
  );
};

export default NewPanel;
