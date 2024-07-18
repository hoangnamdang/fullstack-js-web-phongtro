import React from "react";
import { dataComponentSupport } from "../../utils/constant";
import { Button } from "../../components";

const Support = () => {
  return (
    <div className="w-1100 m-auto bg-white border-8 border-dashed border-blue-200 p-8 mb-8">
      <img
        className="h-[150px] object-cover block mx-auto mb-4"
        src="https://phongtro123.com/images/support-bg.jpg"
        alt=""
      />
      <p className="text-center mb-4">
        Liên hệ với chúng tôi nếu bạn cần hỗ trợ:
      </p>
      <div className="flex items-center justify-around">
        {dataComponentSupport.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col text-base font-bold items-center"
            >
              <span className="text-orange-400">{item.title}</span>
              <span className="text-blue-800">Điện thoại: {item.phone}</span>
              <span className="text-blue-800">Zalo: {item.zalo}</span>
            </div>
          );
        })}
        <Button
          customStyle="bg-blue-600 font-semibold px-4 py-2 text-white text-base rounded hover:underline"
          text="Gui lien he"
        />
      </div>
    </div>
  );
};

export default Support;
