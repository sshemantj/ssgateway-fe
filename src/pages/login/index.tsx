import LoginModule from "@/modules/LoginModule";
import Navbar from "@/component/molecules/Navbar";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <LoginModule />
      </main>
    </>
  );
};

export default Login;
