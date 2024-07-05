import React from "react";
import { dataProvice } from "../utils/constant";
import ProvinceBtn from "./ProvinceBtn";

const Provice = () => {
  return (
    <div>
      <h2 className="text-center mb-4 text-xl font-semibold">
        Khu vực nổi bật
      </h2>
      <div className="flex justify-center gap-4">
        {dataProvice.map((item) => {
          return <ProvinceBtn key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Provice;
