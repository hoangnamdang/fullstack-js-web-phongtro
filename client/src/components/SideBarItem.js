import React from "react";
import { TfiAngleRight } from "../utils/icon";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { appendUrl } from "../utils/commonUtil";
import { string_to_slug } from "../utils/stringToSlug";
const SideBarItem = ({ title, type, dataFilter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryUrlParams = searchParams.entries();

  const getValueFilter = (data) => {
    if (type === "price") {
      if (data.maxPrice === -1) return { gia_den: data.minPrice };
      if (data.minPrice === -1) return { gia_tu: data.maxPrice };
      return { gia_tu: data.minPrice, gia_den: data.maxPrice };
    }

    if (data.maxAcreage === -1) return { dien_tich_den: data.minAcreage };
    if (data.minAcreage === -1) return { dien_tich_tu: data.maxAcreage };
    return { dien_tich_tu: data.minAcreage, dien_tich_den: data.maxAcreage };
  };
  const BlockFilter = ({ item }) => {
    return (
      <div
        onClick={() => handleFilter(item)}
        className="basis-2/4 group/filter"
      >
        <div className="flex items-center gap-1">
          <TfiAngleRight />
          <p className="group-hover/filter:text-orange-500">{item.value}</p>
        </div>
      </div>
    );
  };

  const handleFilter = (data) => {
    if (type === "category") {
      const urlCategory = string_to_slug(data.value);
      const searchParam = createSearchParams(
        appendUrl(queryUrlParams)
      ).toString();

      navigate({ pathname: urlCategory, search: searchParam });
    } else {
      const searchParam = createSearchParams(
        appendUrl(queryUrlParams, getValueFilter(data))
      ).toString();

      navigate({ pathname: location.pathname, search: searchParam });
    }
  };

  return (
    <div className="bg-white p-4 rounded-sm mb-5">
      <h4 className="font-bold text-xl mb-2 text-gray-800">{title}</h4>
      <div className="flex flex-wrap items-center gap-y-2">
        {dataFilter.map((item) => {
          const key = type === "category" ? item.code : item.id;
          return <BlockFilter key={key} item={item} />;
        })}
      </div>
    </div>
  );
};

export default SideBarItem;
