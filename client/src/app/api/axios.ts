import { BASE_URL } from "@/config";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;
export const api = axios.create({
  baseURL: BASE_URL,
});
