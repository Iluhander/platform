import axios from "axios";

const $serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND
});

$serverApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default $serverApi;
