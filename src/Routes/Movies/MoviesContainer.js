import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import Loading from "../../Components/Loading";
import MoviesPresenter from "./MoviesPresenter";

const Home = () => {
  const [data, setdata] = useState({
    movies: { nowPlaying: [], upcoming: [], topRated: [] },
    error: "",
    isLoading: true,
  });
  const getMovies = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: topRated },
      } = await movieApi.topRated();
      setdata((cur) => ({
        ...cur,
        movies: { nowPlaying, upcoming, topRated },
      }));
    } catch (error) {
      setdata((cur) => ({ ...cur, error }));
    } finally {
      setdata((cur) => ({ ...cur, isLoading: false }));
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const { isLoading, movies, error } = data;
  return isLoading ? (
    <Loading />
  ) : (
    <MoviesPresenter movies={movies} error={error} />
  );
};

export default Home;
