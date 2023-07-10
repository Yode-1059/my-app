import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const links = [
  {
    label: "ホーム",
    path: "/",
  },
  {
    label: "記事検索",
    path: "/serch",
  },
  {
    label: "このサイトについて",
    path: "/about",
  },
];

const subItems = [
  {
    label: "会社概要",
    path: "/company",
  },
  {
    label: "利用規約",
    path: "/trems",
  },
  {
    label: "プライバシーポリシー",
    path: "/privacy",
  },
];

const Sidebar = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: VoidFunction;
}) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", closeModal);
    return () => router.events.on("routeChangeStart", closeModal);
  }, []);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -transition-x-full"
            enterTo="opacity-100 transition-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transition-x-0"
            leaveTo="opacity-0 -transition-x-full"
          >
            <Dialog.Panel className=" overflow-y-auto w-80 fixed left-0 inset-y-0 bg-white p-10 z-20">
              <Link href="/">
                <a className="flex mb-6">
                  <Image src="/logo.svg" width={160} height={32} alt="logo" />
                </a>
              </Link>
              <ul className=" space-y-3">
                {links.map((itme) => (
                  <li key={itme.label}>
                    <Link href={itme.path}>
                      <a className="py-1 block hover:text-blue-500">
                        {itme.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="my-6" />
              <ul className=" space-y-1">
                {subItems.map((itme) => (
                  <li key={itme.label}>
                    <Link href={itme.path}>
                      <a className="py-1 block hover:text-blue-500">
                        {itme.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-slate-600">© YoSenju</p>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Sidebar;
