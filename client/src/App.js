import React, { useEffect } from "react";
import { Path } from "./utils/path";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Homepage, Rent } from "./containers/Public";
import { useDispatch } from "react-redux";
import * as action from "./store/actions";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getFilterPrice());
    dispatch(action.getFilterAcreage());
    dispatch(action.getCategory());
    dispatch(action.getListProvince());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.REGISTER} element={<Login />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<Rent />} />
          <Route path={Path.NHA_CHO_THUE} element={<Rent />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<Rent />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<Rent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
