import styles from "@/styles/Home.module.css";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main className={`${styles.main}`}>
        <HomeModule />
      </main>
    </>
  );
};

export default Home;
