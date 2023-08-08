import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";


const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`,
});

usersApi.interceptors.request.use((config)=>{
  config.headers={
    ...config.headers,
    Authorization:sessionStorage.getItem("token"),
  };
  return config;
})

export default usersApi;