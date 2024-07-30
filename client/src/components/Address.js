import React, { useEffect, useState } from "react";
import SelectBox from "./SelectBox";
import { getDistrictThirdParty, getProvinceThirdParty } from "../services/app";

const Address = ({ dataPayload, setDataPayload, errors, setErrors }) => {
  const [listProvince, setListProvince] = useState("");
  const [listDistrict, setListDistrict] = useState("");

  useEffect(() => {
    const fetchApiGetProvince = async () => {
      const response = await getProvinceThirdParty();
      setListProvince(response?.data?.results);
    };
    fetchApiGetProvince();
  }, []);

  useEffect(() => {
    const fetchApiGetDistrict = async (provinceId) => {
      const response = await getDistrictThirdParty(provinceId);
      setListDistrict(response?.data?.results);
    };
    dataPayload?.provinceId && fetchApiGetDistrict(dataPayload?.provinceId);
    if (!dataPayload?.provinceId) {
      setListDistrict([]);
      setDataPayload((prev) => ({ ...prev, districtId: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPayload?.provinceId]);

  useEffect(() => {
    const itemProvince =
      (listProvince?.length > 0 &&
        listProvince?.find(
          (item) => item.province_id === dataPayload?.provinceId
        )) ||
      null;
    const itemDistrict =
      (listDistrict.length > 0 &&
        listDistrict?.find(
          (item) => item.district_id === dataPayload?.districtId
        )) ||
      null;
    setDataPayload((prev) => ({
      ...prev,
      address: `${itemDistrict?.district_name || ""}, ${
        itemProvince?.province_name || ""
      }`,
      provinceName: itemProvince?.province_name || "",
      districtName: itemDistrict?.district_name || "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPayload?.provinceId, dataPayload?.districtId]);

  const itemProvince =
    (listProvince?.length > 0 &&
      listProvince?.find(
        (item) => item.province_id === dataPayload?.provinceId
      )) ||
    null;
  const itemDistrict =
    (listDistrict.length > 0 &&
      listDistrict?.find(
        (item) => item.district_id === dataPayload?.districtId
      )) ||
    null;

  return (
    <div className="p-2">
      <h1 className="text-xl mb-3">Dia chi cho thue</h1>
      <div className="flex gap-3">
        <SelectBox
          setError={setErrors}
          error={errors?.["provinceId"]}
          required
          name={"provinceId"}
          title="Tinh/thanh pho"
          keyId="province_id"
          keyName="province_name"
          value={dataPayload?.provinceId}
          setValue={setDataPayload}
          listData={listProvince}
        />
        <SelectBox
          setError={setErrors}
          error={errors?.["districtId"]}
          required
          name="districtId"
          title="Quan/huyen"
          keyId="district_id"
          keyName="district_name"
          value={dataPayload?.districtId}
          setValue={setDataPayload}
          listData={listDistrict}
        />
      </div>
      <label className="text-base font-semibold">Dia chi</label>
      <input
        type="text"
        readOnly
        value={`${itemDistrict?.district_name || ""} ${
          itemProvince?.province_name || ""
        }`}
        className="p-1 bg-gray-200 w-full outline-none border border-gray-500"
      />
    </div>
  );
};

export default Address;
