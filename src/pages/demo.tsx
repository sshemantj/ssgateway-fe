import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hideBackNavbar } from "@/store/slices/menu";
import DemoLocation from "@/modules/demoModule/demoLocation";
import DemoHookTesting from "@/modules/demoModule/demoHookTesting";

const Demo: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main>
        {/* <DemoLocation /> */}
        <DemoHookTesting />
      </main>
    </>
  );
};

export default Demo;
