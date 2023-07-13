import { ReactElement } from "react";
import { useAuth } from "../context/auth";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "../types/post";
import { admin_db } from "../firebase/server";
import PostItemCard from "../components/post_item_card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import "swiper/css";

export const getStaticProps: GetStaticProps<any> = async (context) => {
  const snap = await admin_db
    .collection(`posts`)
    .orderBy("createdAt", "desc")
    .limit(10)
    .get();
  const posts = snap.docs.map((doc) => doc.data() as Post);
  return {
    props: {
      posts,
    },
  };
};

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  const { user } = useAuth();
  return (
    <div>
      <Head>
        <title>App</title>
        <meta name="description" content="densestu" />
      </Head>
      <main>
        <div>
          <div className="rerative">
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              loop
              keyboard
              navigation={{
                nextEl: "#next",
                prevEl: "#prev",
              }}
              pagination={{
                el: "#pagenation",
                bulletClass:
                  "w-2 h-2 rounded-full bg-slate-500 block cursor-pointer",
                bulletActiveClass: "!bg-blue-500",
                clickable: true,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {new Array(5).fill(null).map((_, index) => {
                return (
                  <SwiperSlide key="index">
                    <div className=" bg-slate-200 aspect-video grid content-center">
                      <p className="text-3xl text-center font-bold">{index}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 z-10 right-12 py-4"
            id="next"
          >
            <ArrowRightCircleIcon className="w-10 h-10 opacity-40" />
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 z-10 left-12 py-4"
            id="prev"
          >
            <ArrowLeftCircleIcon className="w-10 h-10 opacity-40" />
          </div>
          <div id="pagenation" className="flex space-x-2 justify-center mt-4" />
        </div>
        <h2>最新の記事</h2>
      </main>
      {posts?.length ? (
        <ul className=" space-y-3">
          {posts?.map((post) => (
            <li key={post.id}>
              <PostItemCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>記事がありません</p>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
