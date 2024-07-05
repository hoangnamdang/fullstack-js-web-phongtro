import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart, FaStar, FaHeart } from "../utils/icon";
const Item = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const images = JSON.parse(data.images.image);
  const description = JSON.parse(data?.description).join(", ");
  const numStar = Number(data?.star) || 0;
  return (
    <div className="w-full border-2 border-t-red-400 p-2 flex justify-between gap-3">
      <div className="w-2/5">
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {images.map((image, idx) => {
              if (idx > 3) return null;
              return (
                <img
                  key={idx}
                  className="w-[130px] h-[120px] object-cover block"
                  src={image}
                  alt="test"
                />
              );
            })}
          </div>
          <span className="absolute bottom-0 left-2 bg-gray-700 text-white px-1">
            {`${images.length} ảnh`}
          </span>
          <span
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="absolute text-3xl font-bold bottom-0 right-2 text-white"
          >
            {isHover && <FaHeart color="red" size={36} />}
            {!isHover && <CiHeart size={36} />}
          </span>
        </div>
      </div>
      <div className="w-3/5">
        <div className="after:clear-both mb-2">
          {numStar > 0 && (
            <div className="w-[15%] float-left">
              <div className="flex items-center mt-1">
                {Array(Number(data?.star) || 0)
                  .fill()
                  .map((_, idx) => {
                    return <FaStar key={idx} className="text-yellow-500" />;
                  })}
              </div>
            </div>
          )}

          <span className="text-red-700 text-base font-bold hover:underline">
            {data?.title ?? ""}
          </span>
        </div>
        <div>
          <span className="font-bold text-green-600 text-lg mr-4">
            {data?.attributes?.price ?? ""}
          </span>
          <span className="mr-4">{data?.attributes?.acreage ?? ""}</span>
          <span className="hover:underline">{data?.address ?? ""}</span>
          <span className="block text-right text-gray-500">
            {data?.published ?? ""}
          </span>
          <p className="text-gray-500 mb-3 mt-2 line-clamp-4">
            {description ?? ""}
          </p>
          <div className="flex flex-wrap items-center justify-between">
            <span>{data?.user?.name ?? "nguoi viet"}</span>
            <div className="flex items-center gap-4">
              <Link className="bg-blue-700 text-white px-2 rounded">
                Gọi {data?.user?.phone ?? "111111"}
              </Link>
              <Link className="px-2 border border-blue-700 rounded">
                Nhắn Zalo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
