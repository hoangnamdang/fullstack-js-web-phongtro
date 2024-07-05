import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Search from "./Search";
function Home() {
  return (
    <div className="m-auto h-full bg-primary">
      <Header />
      <Navigation />
      <Search />
      <Outlet />
    </div>
  );
}

export default Home;
