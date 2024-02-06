import Navbar from "@/component/molecules/Navbar";
import { useRouter } from "next/router";
import React from "react";

const Process = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <Navbar showBackBtn />
      <h1>current screen : {router.query.screen}</h1>
    </div>
  );
};

export default Process;
