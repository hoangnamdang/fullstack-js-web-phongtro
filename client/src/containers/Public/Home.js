import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
function Home() {
  return (
    <div className="m-auto h-full bg-primary">
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Home;
