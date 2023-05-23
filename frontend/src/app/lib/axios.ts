import axios from "axios";

export const backend = axios.create({
  baseURL: "http://localhost:3333/",
});

backend.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw new Error(error.response.status);
  }
);
