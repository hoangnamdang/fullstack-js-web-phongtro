import React, { useEffect, useState } from "react";
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
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { string_to_slug } from "../../utils/stringToSlug";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [isShowModal, setShowModal] = useState(false);
  const [type, setType] = useState("category");
  const [dataObjSearch, setDataObjSearch] = useState({
    category: { code: "CTPT", text: "Cho thuê phòng trọ" },
    province: { code: "all", text: "" },
    price: { min: "", max: "", text: "" },
    acreage: { min: "", max: "", text: "" },
  });
  const category = useSelector((state) => state.app.category);
  const dataPrice = useSelector((state) => state.filter.dataFilterPrice);
  const dataAcreage = useSelector((state) => state.filter.datFilerAcreage);
  const dataProvince = useSelector((state) => state.province.listProvince);

  const hasValue = (param) => {
    if (param !== undefined && param !== "") {
      return true;
    }
    return false;
  };

  const getDataType = (typeT) => {
    switch (typeT) {
      case "category":
        return category;
      case "province":
        return dataProvince;
      case "price":
        return dataPrice;
      case "acreage":
        return dataAcreage;
      default:
        break;
    }
  };

  const getTitle = () => {
    return {
      category: "Chon loai bat dong san",
      province: "Chon tinh thanh",
      price: "Chon gia",
      acreage: "Chon dien tich",
    };
  };

  const getDefaultStringValue = () => {
    return {
      province: "Toan quoc",
    };
  };

  const handleSearch = () => {
    let objPrice = {};
    let objAcreage = {};
    let objProvince = {};
    let pathName = "";
    for (let key of Object.keys(dataObjSearch)) {
      if (key === "category") {
        const detail =
          category.find((item) => item.code === dataObjSearch[key]?.code) ||
          null;
        if (detail) {
          pathName = string_to_slug(detail.value);
        }
      }
      if (key === "province") {
        const detail =
          dataProvince.find((item) => item.code === dataObjSearch[key]?.code) ||
          null;
        if (detail) {
          objProvince = { province: detail.code };
        }
      }
      if (key === "price") {
        if (
          hasValue(dataObjSearch[key]?.min) &&
          hasValue(dataObjSearch[key]?.max)
        ) {
          objPrice = {
            gia_tu: dataObjSearch[key]?.min,
            gia_den: dataObjSearch[key]?.max,
          };
        }
      }
      if (key === "acreage") {
        if (
          hasValue(dataObjSearch[key]?.min) &&
          hasValue(dataObjSearch[key]?.max)
        ) {
          objAcreage = {
            dien_tich_tu: dataObjSearch[key]?.min,
            dien_tich_den: dataObjSearch[key]?.max,
          };
        }
      }
    }

    const createParams = createSearchParams({
      ...objProvince,
      ...objPrice,
      ...objAcreage,
    }).toString();

    navigate({ pathname: pathName, search: createParams });
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataObjSearch]);

  const dataType = getDataType(type);
  const titleName = getTitle()[type];

  return (
    <div className="w-1100 m-auto bg-amber-400 p-2 mt-4 rounded mb-4">
      <div className="flex justify-between items-center gap-2">
        <SearchItem
          text="Cho thuê phòng trọ"
          value={dataObjSearch.category.text}
          IcBefore={FaRegBuilding}
          IcAfter={FaRegWindowClose}
          onClick={() => {
            setShowModal(true);
            setType("category");
          }}
        />
        <SearchItem
          value={dataObjSearch.province.text}
          onClick={() => {
            setShowModal(true);
            setType("province");
          }}
          text="Toan quoc"
          IcBefore={CiLocationOn}
        />
        <SearchItem
          value={dataObjSearch.price.text}
          onClick={() => {
            setShowModal(true);
            setType("price");
          }}
          text="Chon gia"
          IcBefore={IoPricetagOutline}
        />
        <SearchItem
          value={dataObjSearch.acreage.text}
          onClick={() => {
            setShowModal(true);
            setType("acreage");
          }}
          text="Chon dien tich"
          IcBefore={BiArea}
        />
        <Button
          customStyle="w-full p-2 text-white flex justify-center rounded"
          bgColor="bg-blue-600"
          IcBefore={FaSearch}
          text="Tim kiem"
          onClick={handleSearch}
        />
      </div>
      {isShowModal && (
        <Modal
          open={true}
          title={titleName}
          onClose={() => setShowModal(false)}
          type={type}
          data={dataType}
          dataObjSearch={dataObjSearch}
          dataStringDefault={getDefaultStringValue()[type]}
          setDataObjSearch={setDataObjSearch}
        />
      )}
    </div>
  );
};

export default Search;
