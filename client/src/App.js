import React from "react";
import { Path } from "./utils/path";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./containers/Public";
import OfficeSpace from "./containers/Public/OfficeSpace";
import RoomForRent from "./containers/Public/RoomForRent";
import HouseForRent from "./containers/Public/HouseForRent";
import RentalDepartment from "./containers/Public/RentalDepartment";
import Homepage from "./containers/Public/Homepage";

function App(props) {
  return (
    <div>
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.REGISTER} element={<Login />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<RoomForRent />} />
          <Route path={Path.NHA_CHO_THUE} element={<HouseForRent />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<OfficeSpace />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<RentalDepartment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
