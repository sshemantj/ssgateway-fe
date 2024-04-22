import Head from "next/head";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import HomeModule from "@/modules/homeModule";
import { useAppSelector } from "@/store/hooks";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import NavFields from "@/component/molecules/Navbar/NavFields";
import { CSSProperties } from "react";

const style: CSSProperties = {
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const Old: NextPage = () => {
  const pdType = useAppSelector((state) => state.gateway?.pdType);
  const isMobile = useMobileCheck();

  return (
    <>
      <Head>
        <title>Configuration Panel</title>
      </Head>
      <Navbar showApprovedFields={!isMobile} />
      <main>
        <div style={style}>
          {isMobile ? <NavFields /> : null}
          {pdType !== "" ? <HomeModule /> : null}
        </div>
      </main>
    </>
  );
};

export default Old;
