import React from "react";
import imgUser from "../../asset/img/user.png";
import { useSelector } from "react-redux";
import { menuSidebarSystem } from "../../utils/menuSidebarSystem";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const { data } = useSelector((state) => state.auth);
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <img width={80} src={imgUser} alt="" />
        <div className="flex justify-center flex-col">
          <span>{data?.name}</span>
          <span>{data?.phone}</span>
        </div>
      </div>
      <p className="mb-4">ma thanh vien 12356</p>
      <ul>
        {menuSidebarSystem.map((menu) => {
          return (
            <li key={menu.id} className="text-base">
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-950 font-bold py-2 flex items-center gap-3"
                    : "py-2 flex items-center gap-3"
                }
              >
                {menu.icon}
                {menu.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
