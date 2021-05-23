import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import Loading from "../../Components/Loading";
import DetailPresenter from "./DetailPresenter";

const Detail = ({
  location: { pathname },
  match: {
    params: { id },
  },
}) => {
  const [data, setData] = useState({ detail: {}, error: "", isLoading: true });
  const getDetail = async () => {
    let detail = {};
    try {
      if (pathname.includes("/movies/"))
        ({ data: detail } = await movieApi.detail(id));
      else if (pathname.includes("/tvs/")) {
        ({ data: detail } = await tvApi.detail(id));
        const {
          data: { imdb_id },
        } = await tvApi.externalIds(id);
        detail.imdb_id = imdb_id;
      }
      setData((cur) => ({ ...cur, detail }));
    } catch (error) {
      setData((cur) => ({ ...cur, error }));
    } finally {
      setData((cur) => ({ ...cur, isLoading: false }));
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  const { isLoading, detail, error } = data;
  return isLoading ? (
    <Loading />
  ) : (
    <DetailPresenter detail={detail} error={error} />
  );
};

export default Detail;
