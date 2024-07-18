import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Search, Info, Support } from "./index";
function Home() {
  return (
    <div className="m-auto h-full bg-primary">
      <Header />
      <Navigation />
      <Search />
      <div>
        <Outlet />
      </div>
      <Info />
      <Support />
    </div>
  );
}

export default Home;
