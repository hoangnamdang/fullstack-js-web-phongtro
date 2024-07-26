import React, { useState } from "react";
import logo from "./../../asset/img/logo-phongtro.png";
import {
  CiHeart,
  FiUserPlus,
  GoPlusCircle,
  IoIosLogIn,
  CiLogout,
} from "../../utils/icon";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../utils/path";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import { menuManagerUser } from "../../utils/menuManagerUser";
function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, data: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isShowMenu, setShowMenu] = useState(false);
  const goLogin = () => {
    return navigate(Path.LOGIN, { state: { flag: "LOGIN" } });
  };

  const goRegister = () => {
    return navigate(Path.REGISTER, { state: { flag: "REGISTER" } });
  };

  const handleLogout = () => {
    dispatch(action.logout());
  };
  return (
    <div className="w-1100 m-auto flex items-center justify-between p-3">
      <Link to={"/"}>
        <img src={logo} width={270} height={40} alt="ttt" />
      </Link>
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <>
            <Button
              text={"Yeu thich"}
              customStyle="hover:underline"
              IcBefore={<CiHeart />}
            />
            <Button
              text={"Dang nhap"}
              IcBefore={<FiUserPlus />}
              customStyle="hover:underline"
              handleClick={goLogin}
            />
            <Button
              text={"Dang ky"}
              customStyle="hover:underline"
              IcBefore={<IoIosLogIn />}
              handleClick={goRegister}
            />
          </>
        )}
        {isLoggedIn && (
          <div className="relative">
            <div className="flex items-center gap-2">
              <span>Xin chao {user?.name} </span>
              <Button
                text={"Quan ly tai khoan"}
                customStyle="hover:underline bg-blue-600 text-white p-2"
                handleClick={() => setShowMenu((prev) => !prev)}
              />
            </div>
            {isShowMenu && (
              <div className="absolute bg-white shadow-md rounded-sm p-4 right-0">
                <ul>
                  {menuManagerUser.map((menu) => {
                    return (
                      <li key={menu.id} className="mb-2 hover:bg-blue-400">
                        <Link
                          to={menu.path}
                          className=" p-2 flex items-center gap-2"
                        >
                          {menu.icon}
                          {menu.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li
                    onClick={handleLogout}
                    className="p-2 flex items-center gap-2 cursor-pointer"
                  >
                    <CiLogout />
                    <p>thoat</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <Button
          text={"Dang tin mien phi"}
          color={"text-white"}
          bgColor={"bg-red-600"}
          IcAfter={<GoPlusCircle />}
          customStyle={"p-2 rounded-md hover:underline"}
        />
      </div>
    </div>
  );
}

export default Header;
