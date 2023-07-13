import React from "react";
import { useUser } from "../lib/user";
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "../types/post";

const PostItemCard = ({ post }: { post: Post }) => {
  const user = useUser(post.authorId);
  return (
    <>
      <div className=" rounded-md shadow p-4">
        <h2 className=" line-clamp-2">
          <Link href={`posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </h2>
        {user && (
          <div className="flex mt-4 items-center">
            <img
              src={user?.avatarURL}
              className="w-10 h-10 block rounded-full"
              alt=""
            />
            <div className=" ml-5">
              <p className=" truncate">{user.name}</p>
              <p className=" text-slate-500 text-sm">
                {format(post.createdAt, "yyyy/MM/dd")}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostItemCard;
