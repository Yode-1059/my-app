import React, { ReactElement } from "react";
import PostForm from "../components/post-form";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const createPost: NextPageWithLayout = () => {
  return (
    <div className="mt-6">
      <PostForm isEditMode={false} />
    </div>
  );
};

createPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default createPost;
