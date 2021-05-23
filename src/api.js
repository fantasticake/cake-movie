import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "0cc74b685e276eff7b661d58d21277b1",
    language: "en-US",
  },
});

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  topRated: () => api.get("movie/top_rated"),
  detail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (query, include_adult = false) =>
    api.get("/search/movie", {
      params: {
        query,
        include_adult,
      },
    }),
};

export const tvApi = {
  airingToday: () => api.get("tv/airing_today"),
  onTheAir: () => api.get("tv/on_the_air"),
  topRated: () => api.get("tv/top_rated"),
  detail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (query, include_adult) =>
    api.get("/search/tv", {
      params: {
        query,
        include_adult,
      },
    }),
  externalIds: (id) => api.get(`/tv/${id}/external_ids`),
};
