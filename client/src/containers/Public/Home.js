import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Navigation, Search, Info, Support } from "./index";
import { Path } from "../../utils/path";
function Home() {
  const location = useLocation();
  const isFlagAccount = location?.state?.flag;
  const isPageDetail = location?.pathname?.includes(Path.DETAIL);
  return (
    <div className="m-auto h-full bg-primary">
      <Header />
      <Navigation />
      {!(isPageDetail || isFlagAccount) && <Search />}
      <div>
        <Outlet />
      </div>
      <Info />
      <Support />
    </div>
  );
}

export default Home;
