import axios from "../axiosConfig";
import axiosDefault from "axios";
export const handleCategory = async () => {
  const response = await axios.get("/api/v1/category/all");
  return response;
};

export const getProvinceThirdParty = async () => {
  const response = await axiosDefault.get(
    "https://vapi.vnappmob.com/api/province/"
  );
  return response;
};

export const getDistrictThirdParty = async (provinceId) => {
  const response = await axiosDefault.get(
    `https://vapi.vnappmob.com/api/province/district/${provinceId}`
  );
  return response;
};

export const handelUploadImage = async (formData) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
  const response = await axiosDefault.post(url, formData);
  return response;
};
