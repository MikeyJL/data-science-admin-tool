import { Axios } from "axios";

export const axiosClient = new Axios({
  baseURL: process.env.API_URL,
});
