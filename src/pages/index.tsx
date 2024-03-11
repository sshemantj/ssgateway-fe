import Head from "next/head";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import HomeModule from "@/modules/homeModule";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SS-gateway!</title>
      </Head>
      <Navbar />
      <main>
        <div style={{ margin: "1rem" }}>
          <HomeModule />
        </div>
      </main>
    </>
  );
};

export default Home;
