import { ReactElement } from "react";
import Button from "../components/button";
import { loginFunc, logoutFunc } from "../lib/auth";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";

const login: NextPageWithLayout = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <Button onClick={loginFunc}>ログイン</Button>
    </div>
  );
};

login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default login;
