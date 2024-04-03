import Head from "next/head";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import HomeModule from "@/modules/homeModule";
import { useAppSelector } from "@/store/hooks";

const Home: NextPage = () => {
  const pdType = useAppSelector((state) => state.gateway?.pdType);

  return (
    <>
      <Head>
        <title>SS-gateway!</title>
      </Head>
      <Navbar showApprovedFields />
      <main>
        <div style={{ margin: "1rem" }}>
          {pdType !== "" ? <HomeModule /> : null}
        </div>
      </main>
    </>
  );
};

export default Home;
