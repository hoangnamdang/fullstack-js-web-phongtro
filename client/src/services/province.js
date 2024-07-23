import axios from "../axiosConfig";

export const apiGetListProvince = async () => {
  const response = await axios.get("/api/v1/province");
  return response;
};
