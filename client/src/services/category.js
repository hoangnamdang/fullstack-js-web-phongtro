import axios from "../axiosConfig";

export const handleCategory = async () => {
  const response = await axios.get("/api/v1/category/all");
  return response;
};
