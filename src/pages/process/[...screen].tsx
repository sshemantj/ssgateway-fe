import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { screenRoutes } from "@/constants/allRoutes";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";

const loading = () => <p>Loading...</p>;

const ScannerScreen = dynamic(() => import("@/modules/process/scannerScreen"), {
  ssr: false,
  loading,
});
const ScannedItemScreen = dynamic(
  () => import("@/modules/process/scannedItemScreen"),
  { ssr: false }
);
const SummaryScreen = dynamic(() => import("@/modules/process/summaryScreen"), {
  ssr: false,
  loading,
});
const PaymentScreen = dynamic(() => import("@/modules/process/paymentScreen"), {
  ssr: false,
  loading,
});
const ShowQrScreen = dynamic(() => import("@/modules/process/showQrScreen"), {
  ssr: false,
  loading,
});

const Process = () => {
  const router = useRouter();

  const showCurrentScreen = (path: string) => {
    switch (path) {
      case screenRoutes.SCANNER_SCREEN.replace("/", ""):
        return <ScannerScreen />;
      case screenRoutes.SCANNED_ITEM_SCREEN.replace("/", ""):
        return <ScannedItemScreen />;
      case screenRoutes.SUMMARY_SCREEN.replace("/", ""):
        return <SummaryScreen />;
      case screenRoutes.PAYMENT_SCREEN.replace("/", ""):
        return <PaymentScreen />;
      case screenRoutes.SHOW_QR_SCREEN.replace("/", ""):
        return <ShowQrScreen />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar showBackBtn />
      {showCurrentScreen(router.query.screen?.[0] as string) || (
        <h1>No screen found!</h1>
      )}
    </div>
  );
};

export default Process;
