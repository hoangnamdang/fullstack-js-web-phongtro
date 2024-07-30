import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Path } from "../../utils/path";
import Header from "./Header";
import Sidebar from "./Sidebar";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn)
    return (
      <Navigate
        to={`/${Path.LOGIN}`}
        replace={true}
        state={{ flag: "LOGIN" }}
      />
    );
  return (
    <div>
      <Header />
      <div className="flex gap-2 h-[calc(100vh-40px)] overflow-hidden">
        <div className="w-1/4 bg-gray-300">
          <Sidebar />
        </div>
        <div className="w-3/4 overflow-y-auto bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
