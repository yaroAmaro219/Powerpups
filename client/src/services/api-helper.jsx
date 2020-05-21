const axios = require("axios");

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://"
      : "http://localhost:3000",
});

export const loginUser = async (loginData) => {
  const resp = await api.post("auth/login", { auth: loginData });
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
};

export const registerUser = async (registerData) => {
  const resp = await api.post("/users", { user: registerData });
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
};

export const verifyUser = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get("/auth/verify");
    return resp.data;
  }
  return false;
};

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
};

export const postTeam = async (name) => {
  const resp = await api.post(`/squads`, { squad: name });
  return resp.data;
};

export const showTeam = async () => {
  const resp = await api.get(`/squads`)
  return resp.data
}

export const postUserTeam = async (id, name) => {
  const resp = await api.post(`/squads`, { squad: name });
  return resp.data;
};

