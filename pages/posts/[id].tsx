import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { admin_db } from "../../firebase/server";
import { useUser } from "../../lib/user";
import { Post } from "../../types/post";
import { useAuth } from "../../context/auth";
import Link from "next/link";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "../../components/layout";

export const getStaticProps: GetStaticProps<{
  post: Post;
}> = async (context) => {
  const snap = await admin_db.doc(`posts/${context.params?.id}`).get();
  const post = snap.data() as Post;
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const PostDetailPage: NextPageWithLayout = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const user = useUser(post?.authorId);
  const { fbUser } = useAuth();
  const isAuter = fbUser?.uid === post?.authorId;

  if (!post) {
    return <p>記事はない</p>;
  }

  return (
    <div className=" container">
      <h1 className=" font-bold text-lg mb-2">{post.title}</h1>
      {user && (
        <div className="flex mb-4">
          <div className="w-10 h-10 mr-2 bg-slate-100 rounded-full"></div>
          <div className="flex-1">
            <p>{user.name}</p>
            <p className=" text-slate-600 ">
              {format(post.createdAt, "yyyy年MM月dd日投稿")}
            </p>
          </div>
        </div>
      )}
      <p className="">{post.body}</p>
      {isAuter && (
        <Link href={`/posts/${post.id}/edit`}>
          <a className=" text-slate-300">編集</a>
        </Link>
      )}
    </div>
  );
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostDetailPage;
