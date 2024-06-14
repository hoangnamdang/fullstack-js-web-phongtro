import axios from "../axiosConfig";
export const handleRegister = async (params) => {
  const response = await axios.post("/api/v1/auth/register", {
    name: params.name,
    phone: params.phone,
    password: params.password,
  });
  return response;
};
