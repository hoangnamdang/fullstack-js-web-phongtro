import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as action from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { string_to_slug } from "../../utils/stringToSlug";
function Navigation() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.app.category);

  useEffect(() => {
    dispatch(action.getCategory());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const active = "bg-red-600 px-4";
  const notActive = "hover:bg-red-600 px-4";
  return (
    <div className="bg-blue-600 m-auto">
      <div className="w-1100 m-auto text-white font-semibold h-[40px]">
        <ul className="flex leading-10">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Trang chu
          </NavLink>
          {category.length > 0 &&
            category.map((lk) => {
              return (
                <NavLink
                  key={lk.code}
                  state={{ categoryCode: lk.code }}
                  className={({ isActive }) => (isActive ? active : notActive)}
                  to={string_to_slug(lk.value)}
                >
                  {lk.value}
                </NavLink>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
