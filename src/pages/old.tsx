import Head from "next/head";
import { NextPage } from "next";
import DashboardModule from "@/modules/dashboardModule";
import { useAppSelector } from "@/store/hooks";
import { useMobileCheck } from "@/hooks/useMobileCheck";
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
      <main>
        <div style={style}>{pdType !== "" ? <DashboardModule /> : null}</div>
      </main>
    </>
  );
};

export default Old;
