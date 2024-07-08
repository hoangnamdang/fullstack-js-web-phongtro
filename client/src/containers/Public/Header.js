import React from "react";
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
function Header() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
        {!authState.isLoggedIn && (
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
        {authState.isLoggedIn && (
          <>
            <span>Xin chao user </span>
            <Button
              text={"Dang xuat"}
              customStyle="hover:underline"
              IcBefore={<CiLogout />}
              handleClick={handleLogout}
            />
          </>
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
