import React from "react";
import Province from "../../components/Province";
import { titleHomePage } from "../../utils/constant";
import { List, SideBar } from "./index";

const Homepage = () => {
  return (
    <div className="w-1100 m-auto">
      <div className="mb-4">
        <h1 className="text-center font-bold text-2xl text-slate-700">
          {titleHomePage.title}
        </h1>
        <p className="text-slate-600">{titleHomePage.description}</p>
      </div>
      <Province />
      <div className="w-full flex justify-between gap-4 mt-5">
        <div className="w-2/3">
          <List />
        </div>
        <div className="w-1/3">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
