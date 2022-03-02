import React, { useRef } from "react";
import styled from "styled-components";
import Scroller from "../../Components/Scroller";
import defaultImg from "../../images/defaultImg.jpg";

const Container = styled.div`
  position: relative;
  padding-bottom: 50px;
  color: #f7e8e8;
  a {
    color: #f7e8e8;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const BgImg = styled.img`
  position: absolute;
  width: 100%;
  background-repeat: repeat-y;
  opacity: 0.6;
  z-index: -1;
`;
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 60px;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;

const Title = styled.h3`
  font-size: 35px;
`;

const OriTitle = styled.h3`
  font-size: 20px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  margin: 40px 0 70px 0;
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const ReleaseDate = styled.span``;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #10002b;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const VoteAverage = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffeaa7;
`;

const VoteCount = styled.span``;

const IMDbLink = styled.div`
  margin-top: 10px;
`;

const Runtime = styled.span``;

const Genres = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #10002b;
  border-radius: 10px;
  padding: 15px 25px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Genre = styled.li``;

const SeasonsBox = styled.div`
  position: relative;
  margin: 0 100px 40px 100px;
  :hover {
    ul {
      ::-webkit-scrollbar {
        background-color: #f7e8e8;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #ffc7c7;
      }
    }
  }
`;

const Seasons = styled.ul`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const Season = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const SeasonPoster = styled.img`
  height: 240px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;
`;

const BottomBox = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isNoVideo ? "0" : "490px")} 1fr;
  padding: 0 100px;
  margin-top: 40px;
`;

const Overview = styled.p`
  margin-left: 50px;
  font-size: 21px;
  line-height: 30px;
`;

const CompanyList = styled.ul`
  background-color: #f7e8e8;
  padding: 10px;
  display: flex;
  gap: 20px;
  margin-left: 50px;
  align-items: flex-end;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: center;
  li {
    img {
      width: 80px;
      font-size: 12px;
      text-align: center;
    }
  }
`;

const CountryList = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 15px;
  margin-top: 30px;
  margin-left: 50px;
  flex-wrap: wrap;
`;

const Videos = styled.ul`
  height: ${(props) => (props.isNoVideo ? "0" : "70vh")};
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: #f7e8e8;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffc7c7;
  }
`;

const Video = styled.iframe`
  width: 450px;
  height: 250px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

function Detail({
  detail: {
    videos,
    backdrop_path,
    title,
    name,
    original_name,
    original_title,
    original_language,
    runtime,
    episode_run_time,
    genres,
    release_date,
    first_air_date,
    last_air_date,
    vote_average,
    vote_count,
    seasons,
    overview,
    imdb_id,
    production_companies,
    production_countries,
  },
  error,
}) {
  const isNoVideo = videos.results.length === 0;
  const listRef = useRef();
  return (
    <Container>
      {backdrop_path ? (
        <BgImg src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} />
      ) : null}
      <div>
        <Titles>
          <Title>{title || name}</Title>
          {title !== original_title || name !== original_name ? (
            <OriTitle>
              ( {original_language} : {original_title || original_name} )
            </OriTitle>
          ) : null}
        </Titles>
        <TopBox>
          <div>
            <Runtime>
              {(runtime && `${runtime} min`) ||
                episode_run_time.map((time, index) => (
                  <span key={index}>{`${time} min`}</span>
                ))}
            </Runtime>
            <Genres>
              {genres.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
          </div>
          <div>
            <ReleaseDate>
              {release_date || `${first_air_date} ~ ${last_air_date}`}
            </ReleaseDate>
            <VoteContainer>
              <VoteAverage>
                <span>{`${vote_average} / 10`}</span>
                <i className="fas fa-star"></i>
              </VoteAverage>
              <VoteCount>{`${vote_count} votes`}</VoteCount>
            </VoteContainer>
            <IMDbLink>
              <a
                href={`https://www.imdb.com/title/${imdb_id}`}
                target="_blank"
                rel="noreferrer"
              >
                IMDb
              </a>
            </IMDbLink>
          </div>
        </TopBox>
        {seasons ? (
          <SeasonsBox>
            <Scroller listRef={listRef} visible={seasons.length > 5} />
            <Seasons ref={listRef}>
              {seasons.map((season) => (
                <Season key={season.id}>
                  <SeasonPoster
                    src={
                      season.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                        : defaultImg
                    }
                  />
                  <span>{season.name}</span>
                </Season>
              ))}
            </Seasons>
          </SeasonsBox>
        ) : null}
        <BottomBox isNoVideo={isNoVideo}>
          <div>
            <Videos isNoVideo={isNoVideo}>
              {videos.results.map((video) => (
                <Video
                  key={video.id}
                  src={`https://www.youtube.com/embed/${video.key}`}
                ></Video>
              ))}
            </Videos>
          </div>
          <div>
            <Overview>{overview}</Overview>
            <CompanyList>
              {production_companies.map(
                ({ id, name, logo_path }) =>
                  logo_path && (
                    <li key={id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${logo_path}`}
                        title={name}
                        alt={name}
                      />
                    </li>
                  )
              )}
            </CompanyList>
            <CountryList>
              {production_countries.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </CountryList>
          </div>
        </BottomBox>
      </div>
    </Container>
  );
}

export default Detail;
