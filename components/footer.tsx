import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    label: "設定",
    path: "/setting",
  },
];

const Footer = () => {
  return (
    <div>
      <footer className=" bg-slate-200 py-10 border-t mt-10">
        <div className=" container">
          <div className="mb-6">
            <Link href="/">
              <a className="flex">
                <Image src="/logo.svg" width={160} height={32} />
              </a>
            </Link>
          </div>
          <h2 className=" font-bold mb-3 text-slate-500">メニュー</h2>
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.path}>
                  <a className="hover:text-blue-500">{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p className=" mt-4 text-slate-500">&copy;2023 YoSenju.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
