import LoginModule from "@/modules/LoginModule";
import Navbar from "@/component/molecules/Navbar";
import { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main>
        <LoginModule />
      </main>
    </>
  );
};

export default Login;
