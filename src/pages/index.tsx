import styles from "@/styles/Home.module.css";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { HTMLAttributes, useRef } from "react";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const Home: NextPage = () => {
  const ref = useRef<HTMLElement | null>(null);
  const callApi = async (data: string) => {
    try {
      const newData = data.replaceAll('"', "'");
      console.log(JSON.stringify({ newData }));
      const response = await fetch(
        "https://htmldocapi.vercel.app/api/htmlDoc/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newData }),
        }
      );
      if (response.ok) {
        toast.success("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClick = async () => {
    const data = ref.current?.outerHTML;
    await callApi(`${data}`);
  };
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main ref={ref} className={`${styles.main}`}>
        <HomeModule />
        <Button variant="contained" onClick={() => handleOnClick()}>
          get data
        </Button>
      </main>
      <ToastContainer />
    </>
  );
};

export default Home;
