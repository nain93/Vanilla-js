import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export const searchApi = {
  search: (text) =>
    api.get("search/users", {
      params: {
        q: text,
        page: 1,
        per_page: 100,
      },
    }),
};

export default api;
