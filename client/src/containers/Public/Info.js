import React from "react";
import { dataComponentInfo } from "../../utils/constant";
const Info = () => {
  return (
    <div className="w-1100 m-auto bg-white rounded p-5 mb-7">
      <div className="pt-5 px-12 pb-5">
        <h4 className="text-2xl font-bold text-center mb-5">
          {dataComponentInfo.title}
        </h4>
        <p className="text-center mb-3">{dataComponentInfo.description}</p>
        <div className="flex items-center justify-around mb-5">
          {dataComponentInfo.statistics.map((item, idx) => {
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl font-semibold">{item.num}</span>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
        <h5 className="text-xl font-bold text-center mb-5">
          {dataComponentInfo.logan}
        </h5>
        <p className="italic text-gray-600 mb-3 text-center">
          {dataComponentInfo.evaluation}
        </p>
        <p className="mb-4 text-center">{dataComponentInfo.user}</p>
        <p className="text-xl font-bold text-center ">
          {dataComponentInfo.question}
        </p>
      </div>
    </div>
  );
};

export default Info;
