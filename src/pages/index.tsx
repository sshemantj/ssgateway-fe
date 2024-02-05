import styles from "@/styles/Home.module.css";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className={`${styles.main}`}>
        <HomeModule />
      </main>
    </>
  );
};

export default Home;
