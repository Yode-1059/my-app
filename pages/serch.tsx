import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  Hits,
  HitsProps,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";
import { debounce } from "debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useUser } from "../lib/user";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import PostItemCard from "../components/post_item_card";

const searchClient = algoliasearch(
  "D9IF7ZPLIO",
  "3de4887d9b853048d8d370bf263e3f4d"
);

const Serch: NextPageWithLayout = () => {
  const search: SearchBoxProps["queryHook"] = (query, hook) => {
    console.log("検索実行");

    hook(query);
  };

  const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
    const { results } = useInstantSearch();

    if (!results.__isArtificial && results.nbHits === 0) {
      return <p>{results.query}の検索結果はない</p>;
    }
    return (
      <div>
        {results.query && (
          <p className=" text-sm text-slate-300">
            {results.query}の検索結果が{results.nbHits}
            出た
          </p>
        )}
        {children}
      </div>
    );
  };
  return (
    <div className=" container">
      <h1>検索</h1>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox
          queryHook={debounce(search, 500)}
          classNames={{
            root: "relative inline-block",
            input: "rounded-full border-slate-950 bg-gray-400 pr-10 pl-3 py-2",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
          submitIconComponent={() => (
            <span className="absolute right-0 text-black top-1/2 -translate-y-1/2 p-3 text-slate-200">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
          )}
        />
        <Configure hitsPerPage={10} />
        <NoResultsBoundary>
          <Hits<Post>
            classNames={{
              list: "space-y-4 my-6",
            }}
            hitComponent={({ hit }) => <PostItemCard post={hit} />}
          />
          <Pagination
            classNames={{
              list: "flex space-x-1",
              link: "py-1 px-3 ",
              disabledItem: "opacity-40",
              selectedItem: "text-blue-500",
            }}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
};

Serch.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Serch;
