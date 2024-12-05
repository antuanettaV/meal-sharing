import React from "react";
import Footer from "../src/components/ui/Footer";
import Navbar from "../src/components/ui/Navbar"; 

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
