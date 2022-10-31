import { Axios } from "axios";

export const axiosClient = new Axios({
  baseURL: "http://localhost:8000/api/v1/",
});
