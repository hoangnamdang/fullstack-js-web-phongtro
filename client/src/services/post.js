import axios from "../axiosConfig";
export const apiGetAllPost = async () => {
  const response = await axios.get("/api/v1/post/all");
  return response;
};

export const apiGetPostsByLimit = async (limit, query) => {
  const response = await axios({
    method: "get",
    url: "/api/v1/post/limit",
    params: { ...query, limit },
  });
  return response;
};
