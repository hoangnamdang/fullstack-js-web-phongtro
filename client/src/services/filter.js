import axios from "../axiosConfig";

export const apiGetFilterPrice = async () => {
  const response = await axios.get("/api/v1/filter/price");
  return response;
};
export const apiGetFilterAcreage = async () => {
  const response = await axios.get("/api/v1/filter/acreage");
  return response;
};
