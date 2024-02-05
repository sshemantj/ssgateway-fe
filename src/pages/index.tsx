import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { logo } from "@/images/logo";
import HomeModule from "@/modules/homeModule";

const Home = () => {
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
        <link rel="icon" href={logo} />
      </Head>
      <main className={`${styles.main}`}>
        <HomeModule />
      </main>
    </>
  );
};

export default Home;
