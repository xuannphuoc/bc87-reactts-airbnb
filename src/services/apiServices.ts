import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/swagger/",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const adminInfo = localStorage.getItem("ADMIN_INFO");

  const accessToken = adminInfo
    ? "Bearer " + JSON.parse(adminInfo).accessToken
    : "";

  config.headers["Authorization"] = accessToken;
  config.headers["TokenCybersoft"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

  return config;
});

export default api;
