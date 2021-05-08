import React, { useContext, useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import { SettingContext } from "../../Components/SettingContext";
import SearchPresenter from "./SearchPresenter";

const Search = () => {
  const { includeAdult } = useContext(SettingContext);
  const [input, setInput] = useState("");
  const [data, setData] = useState({
    movies: [],
    tvs: [],
    error: "",
    isLoading: false,
  });
  const onChange = async ({ target: { value } }) => {
    setInput(value);
    if (value) {
      setData((cur) => ({ ...cur, isLoading: true }));
      try {
        const {
          data: { results: movies },
        } = await movieApi.search(value, includeAdult);
        const {
          data: { results: tvs },
        } = await tvApi.search(value, includeAdult);
        setData((cur) => ({ ...cur, movies, tvs }));
      } catch (error) {
        setData((cur) => ({ ...cur, error }));
      } finally {
        setData((cur) => ({ ...cur, isLoading: false }));
      }
    }
  };
  useEffect(() => {
    onChange({ target: { value: input } });
  }, [includeAdult]);
  const { movies, tvs, error, isLoading } = data;
  return (
    <SearchPresenter
      input={input}
      onChange={onChange}
      movies={movies}
      tvs={tvs}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Search;
