import React from "react";

const ProvinceBtn = ({ data }) => {
  return (
    <div>
      <div className="w-[220px] bg-slate-50 text-blue-700 hover:text-yellow-600 flex justify-center items-center flex-col shadow-xl">
        <img
          className="w-full h-[110px] object-cover rounded-t-2xl"
          src={data.image}
          alt={data.name}
        />
        <h3 className="p-2 font-medium">{data.name}</h3>
      </div>
    </div>
  );
};

export default ProvinceBtn;
