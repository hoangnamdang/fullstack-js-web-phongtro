import React from "react";
import { dataProvince } from "../utils/constant";
import ProvinceBtn from "./ProvinceBtn";

const Province = () => {
  return (
    <div>
      <h2 className="text-center mb-4 text-xl font-semibold">
        Khu vực nổi bật
      </h2>
      <div className="flex justify-center gap-4">
        {dataProvince.map((item) => {
          return <ProvinceBtn key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Province;
