import axios from "../axiosConfig";
export const apiGetAllPost = async () => {
  const response = await axios.get("/api/v1/post/all");
  return response;
};
