import { ReactElement } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";
import UserForm from "../components/user_form";

const Profile: NextPageWithLayout = () => {
  return (
    <div>
      <UserForm isEditMode={true} />
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
