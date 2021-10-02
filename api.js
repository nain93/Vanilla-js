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

// export const tvApi = {
//   topRated: () => api.get("tv/top_rated"),
//   popular: () => api.get("tv/popular"),
//   airingToday: () => api.get("tv/airing_today"),
//   showDetail: (id) =>
//     api.get(`tv/${id}`, {
//       params: {
//         append_to_response: "videos",
//       },
//     }),
//   search: (term) =>
//     api.get("search/tv", {
//       params: {
//         query: encodeURIComponent(term),
//       },
//     }),
// };

export default api;
