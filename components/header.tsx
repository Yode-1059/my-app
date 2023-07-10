import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserMenu from "./user_menu";
import { useAuth } from "../context/auth";
import Button from "./button";
import Sidebar from "./sidebar";
import { Bars2Icon } from "@heroicons/react/24/solid";

const Header = () => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsSidebarOpen(true);
  };

  if (isLoading) {
    return null;
  }
  return (
    <>
      <header className="rerative z-10">
        <div className=" flex items-center h-14 border-b container ">
          <button className=" p-2 mr-1" onClick={openModal}>
            <Bars2Icon className="w-6- h-6" />
          </button>
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={160} height={32} alt="logo" />
            </a>
          </Link>
          <span className=" flex-1" />
          {user && (
            <Link href="/create-post">
              <a className="mr-4">投稿</a>
            </Link>
          )}
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          )}
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
    </>
  );
};

export default Header;
