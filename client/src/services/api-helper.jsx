const axios = require("axios");

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? 	"https://git.heroku.com/power-pups.git"
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

export const putSquad = async (squadId, data) => {
  const resp = await api.put(`/sqauds/${squadId}`, {squad: data})
  return resp.data
}

export const showTeam = async () => {
  const resp = await api.get(`/squads`)
  return resp.data
}

export const destroyTeam = async (id) => {
  const resp = await api.delete(`/squads/${id}`)
  return resp.data
}

export const putUser = async (id, userData) => {
  const resp = await api.put(`/users/${id}`, { user: userData })
  return resp.data
}

export const createEvent = async (squadId, data) => {
  const resp = await api.post(`/squads/${squadId}/events`,{event: data} )
  return resp.data
}

export const addUserToSquad = async (squadId) => {
  const resp = await api.post(`squads/${squadId}/members`)
  return resp.data
}

export const createPost = async (squadId, data) => {
  const resp = await api.post(`/squads/${squadId}/posts`, { post: { post: data } })
  return resp.data
}



