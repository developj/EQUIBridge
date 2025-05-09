import axios from "axios";
import Cookies from "js-cookie";
import {
  ExtendedProfileData,
  LoginUserType,
  RegisterUserType,
  JobAdzunaJobsQueryParams,
  ChatRequest,
  ChatResponse
} from "./interface";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const isAuthRoute =
    config.url?.includes("/login") || config.url?.includes("/register") || config.url?.includes("/google-login/");

  if (!isAuthRoute) {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const register = (data: RegisterUserType) =>
  API.post("/register/", data).then((res) => {
    Cookies.set("token", res.data.access, { expires: 7 });
    return res.data;
  });

export const login = (data: LoginUserType) =>
  API.post("/login/", data).then((res) => {
    Cookies.set("token", res.data.access, { expires: 7 });
    return res.data;
  });

export const getProfile = () => API.get("/profile/").then((res) => res.data);

export const updateProfile = (data: ExtendedProfileData) =>
  API.post("/profile/", data).then((res) => {
    return res.data;
  });

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/";
};

export const getAdzunaJobs = (params: JobAdzunaJobsQueryParams) =>
  API.post("/adzuna/search/", params).then((res) => res.data);


export const downloadResume = async () => {
  const response = await API.get('/pdf/resume/', {
    responseType: 'blob', // 👈 important to handle PDF binary data
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  // Create a temporary link to trigger download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'resume.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const sendChat = (data: ChatRequest): Promise<ChatResponse> =>
  API.post<ChatResponse>("/text/chat/", data).then(res => res.data);
