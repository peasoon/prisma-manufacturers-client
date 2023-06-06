import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

interface ILayoutProps {}

const Layout: React.FunctionComponent<
  React.PropsWithChildren<ILayoutProps>
> = () => {
  return (
    <>
      <Header />
      <div className="container main-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
