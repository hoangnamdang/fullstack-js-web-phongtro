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

export const apiGetNewsPost = async () => {
  const response = await axios.get("/api/v1/post/news-post");
  return response;
};

export const apiCreatePost = async (formData) => {
  const response = await axios.post("/api/v1/post/create-post", {
    ...formData,
  });
  return response;
};

export const apiGetPostDemoUpdate = async () => {
  const response = await axios.get("/api/v1/post/get-post-update");
  return response;
};

export const apiDeletePost = async (idPost) => {
  const response = await axios.delete(`/api/v1/post/delete-post/${idPost}`);
  return response;
};

export const apiGetPost = async (idPost) => {
  const response = await axios.get(`/api/v1/post/get-post/${idPost}`);
  return response;
};
