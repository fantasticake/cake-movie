import React, { useEffect, useState } from "react";
import { tvApi } from "../../api";
import Loading from "../../Components/Loading";
import TvsPresenter from "./TvsPresenter";

const Tvs = () => {
  const [data, setdata] = useState({
    tvs: { airingToday: [], onTheAir: [], topRated: [] },
    error: "",
    isLoading: true,
  });
  const getTvs = async () => {
    try {
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: onTheAir },
      } = await tvApi.onTheAir();
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      setdata((cur) => ({
        ...cur,
        tvs: { airingToday, onTheAir, topRated },
      }));
    } catch (error) {
      setdata((cur) => ({ ...cur, error }));
    } finally {
      setdata((cur) => ({ ...cur, isLoading: false }));
    }
  };
  useEffect(() => {
    getTvs();
  }, []);
  const { isLoading, tvs, error } = data;
  return isLoading ? <Loading /> : <TvsPresenter tvs={tvs} error={error} />;
};

export default Tvs;
