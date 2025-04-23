import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export const register = (data: {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  password: string;
}) => API.post("/register/", data).then((res) => {
  Cookies.set("token", res.data.token, { expires: 7 });
  return res.data;
});

export const login = (data: { email: string; password: string }) =>
    API.post("/login/", data).then(res => {
      Cookies.set("token", res.data.token, { expires: 7 });
      return res.data;
    });
  
  export const getProfile = () => API.get("/profile/").then(res => res.data);
  
  export const logout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };
