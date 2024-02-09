import styles from "@/styles/Home.module.css";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { useRef } from "react";
import GetRefButton from "@/component/atoms/getRefButton";

const Home: NextPage = () => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main ref={ref} className={`${styles.main}`}>
        <HomeModule />
      </main>
      {/* <GetRefButton ref={ref} /> */}
    </>
  );
};

export default Home;
