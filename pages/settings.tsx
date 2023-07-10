import { ReactElement } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
  return (
    <div>
      <h1>設定画面</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quis
        corporis vero nesciunt cum ut voluptates quibusdam sequi ex dolore,
        eveniet blanditiis dolorem tempore, sint recusandae, hic sit itaque
        beatae?
      </p>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
