import axios from "../axiosConfig";
export const apiGetAllPost = async () => {
  const response = await axios.get("/api/v1/post/all");
  return response;
};

export const apiGetPostsByLimit = async (page, limit) => {
  const response = await axios.post("/api/v1/post/limit", {
    page: page,
    limit: limit,
  });
  return response;
};
