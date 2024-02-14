import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hideBackNavbar } from "@/store/slices/menu";
import DemoLocation from "@/modules/demoModule/demoLocation";
import GetLocationDetails from "@/modules/demoModule/getLocationDetails";

const Demo: NextPage = () => {
  const dispatch = useAppDispatch();
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main>
        {/* <DemoLocation /> */}
        <h2>isWithinRadius : {`${isWithinRadius}`}</h2>
        <GetLocationDetails
          {...{
            storeLocation: {
              latitude: 19.176755323457076,
              longitude: 72.83375854373317,
            },
            distanceToCalculate: 200,
            setIsWithinRadius,
          }}
        />
      </main>
    </>
  );
};

export default Demo;
