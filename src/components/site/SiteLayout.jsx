import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <NavBar />
      hello
      {children}
      <Footer />
    </>
  );
}
