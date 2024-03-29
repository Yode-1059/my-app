import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="z-0 container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
