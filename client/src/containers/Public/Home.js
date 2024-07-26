import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Navigation, Search, Info, Support } from "./index";
function Home() {
  const location = useLocation();
  const isFlagAccount = location?.state?.flag;
  return (
    <div className="m-auto h-full bg-primary">
      <Header />
      <Navigation />
      {!isFlagAccount && <Search />}
      <div>
        <Outlet />
      </div>
      <Info />
      <Support />
    </div>
  );
}

export default Home;
