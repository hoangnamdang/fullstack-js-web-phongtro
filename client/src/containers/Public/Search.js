import React from "react";
import SearchItem from "../../components/SearchItem";
import { Button } from "../../components";
import {
  BiArea,
  CiLocationOn,
  FaRegBuilding,
  FaRegWindowClose,
  FaSearch,
  IoPricetagOutline,
} from "../../utils/icon";

const Search = () => {
  return (
    <div className="w-1100 m-auto bg-amber-400 p-2 mt-4 rounded mb-4">
      <div className="flex justify-between items-center gap-2">
        <SearchItem
          text="Phong tro, nha tro"
          IcBefore={FaRegBuilding}
          IcAfter={FaRegWindowClose}
        />
        <SearchItem text="toan quoc" IcBefore={CiLocationOn} />
        <SearchItem text="chon gia" IcBefore={IoPricetagOutline} />
        <SearchItem text="chon dien tich" IcBefore={BiArea} />
        <Button
          customStyle="w-full p-2 text-white flex justify-center rounded"
          bgColor="bg-blue-600"
          IcBefore={FaSearch}
          text="Tim kiem"
        />
      </div>
    </div>
  );
};

export default Search;
