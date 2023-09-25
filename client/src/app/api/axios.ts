import axios from "axios";

export const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
export const api = axios.create({
  baseURL: BASE_URL,
});

