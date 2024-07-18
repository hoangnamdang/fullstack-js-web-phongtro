import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { List } from "./index";
import { Province, SideBarItem } from "../../components";
const RoomForRent = () => {
  const location = useLocation();
  const dataFilterPrice = useSelector((state) => state.filter.dataFilterPrice);
  const dataFilterAcreage = useSelector(
    (state) => state.filter.datFilerAcreage
  );
  const category = useSelector((state) => state.app.category);

  const categoryCode = location.state?.categoryCode;
  const dataItemCategory =
    category?.find((item) => item.code === categoryCode) || {};

  return (
    <div className="w-1100 m-auto">
      <div className="mb-4">
        <h1 className="text-center font-bold text-2xl text-slate-700">
          {dataItemCategory?.header}
        </h1>
        <p className="text-slate-600">{dataItemCategory?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex justify-between gap-4 mt-5">
        <div className="w-2/3">
          <List categoryCode={categoryCode} />
        </div>
        <div className="w-1/3">
          <SideBarItem
            title={"xem bang gia"}
            type={"price"}
            dataFilter={dataFilterPrice}
          />
          <SideBarItem
            title={"xem theo dien tich"}
            type={"acreage"}
            dataFilter={dataFilterAcreage}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomForRent;
