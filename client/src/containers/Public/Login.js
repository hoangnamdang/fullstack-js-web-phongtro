import React, { useEffect, useState } from "react";
import { Button, Input } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
  hasValue,
  validationPassword,
  validationPhone,
} from "../../utils/validForm";
function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const flag = location.state?.flag;

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState, navigate]);

  const handleValidation = () => {
    let errorInput = {};
    let formIsValid = true;
    if (!hasValue(dataForm.name) && flag === "REGISTER") {
      formIsValid = false;
      errorInput["name"] = "ten khong duoc de trong";
    }
    if (!hasValue(dataForm.phone)) {
      formIsValid = false;
      errorInput["phone"] = "sdt khong duoc de trong";
    }
    if (!hasValue(dataForm.password)) {
      formIsValid = false;
      errorInput["password"] = "mat khau khong duoc de trong";
    }

    if (hasValue(dataForm.phone) && !validationPhone(dataForm.phone)) {
      formIsValid = false;
      errorInput["phone"] = "sdt khong hop le";
    }
    if (hasValue(dataForm.password) && !validationPassword(dataForm.password)) {
      formIsValid = false;
      errorInput["password"] = "mat khau khong hop le";
    }
    setErrors({ ...errors, ...errorInput });
    return formIsValid;
  };

  const handleChange = (e) => {
    if (!e || !e.target) return false;
    const { name, value } = e.target;
    if (errors && !!value) {
      const isValid =
        (name === "phone" && validationPhone(value)) ||
        (name === "password" && validationPassword(value));
      setErrors({ ...errors, [name]: isValid ? "" : errors[name] });
    }
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleClick = () => {
    if (handleValidation()) {
      if (flag === "REGISTER") {
        dispatch(actions.register(dataForm));
      }
      if (flag === "LOGIN") {
        dispatch(actions.login(dataForm));
      }
    }
  };

  return (
    <div className="w-1100 m-auto">
      <div className="w-[600px] m-auto bg-white flex justify-center flex-col gap-5 p-5 mt-3">
        <label htmlFor="login" className="font-semibold text-3xl">
          {flag === "LOGIN" ? "Dang nhap" : "Dang ky"}
        </label>
        {flag === "REGISTER" && (
          <Input
            label="Ho ten"
            value={dataForm.name}
            onChange={handleChange}
            name="name"
            error={errors["name"]}
          />
        )}
        <Input
          label="So dien thoai"
          type="phone"
          value={dataForm.phone}
          onChange={handleChange}
          name="phone"
          error={errors["phone"]}
        />
        <Input
          label="Mat khau"
          type="password"
          value={dataForm.password}
          onChange={handleChange}
          name="password"
          error={errors["password"]}
        />
        <Button
          bgColor="bg-blue-900"
          color="text-white"
          customStyle="flex justify-center p-4 rounded-sm font-semibold"
          text={flag === "LOGIN" ? "Dang nhap" : "Dang ky"}
          handleClick={handleClick}
        />
        <div className="flex items-center justify-between mt-5">
          {flag === "REGISTER" && (
            <span>
              Ban da co tai khoan?{" "}
              <Link to={"/login"} state={{ flag: "LOGIN" }}>
                Dang nhap ngay
              </Link>
            </span>
          )}
          {flag === "LOGIN" && (
            <>
              <span>Ban quen mat khau</span>
              <Link to={"/register"} state={{ flag: "REGISTER" }}>
                Tao tai khoan moi
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
