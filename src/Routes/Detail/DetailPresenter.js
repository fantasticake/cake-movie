import React from "react";
import styled from "styled-components";
import Scroller from "../../Components/Scroller";
import defaultImg from "../../images/defaultImg.jpg";

const Container = styled.div`
  position: relative;
  padding-bottom: 50px;
  color: #f7e8e8;
`;

const BgImg = styled.img`
  position: absolute;
  width: 100%;
  background-repeat: repeat-y;
  filter: blur(5px) brightness(0.6);
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
  background-color: #8785a2;
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

const Runtime = styled.span``;

const Genres = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #8785a2;
  border-radius: 10px;
  padding: 15px 25px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Genre = styled.li``;

const Seasons = styled.ul`
  display: flex;
  gap: 20px;
  margin: 0 100px 40px 100px;
  overflow-x: auto;
`;

const Season = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const SeasonPoster = styled.img`
  height: 300px;
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

function Detail({ detail, error }) {
  const isNoVideo = detail.videos.results.length === 0;
  return (
    <Container>
      {detail.backdrop_path ? (
        <BgImg
          src={`https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`}
        />
      ) : null}
      <div>
        <Titles>
          <Title>{detail.title || detail.name}</Title>
          {detail.title !== detail.original_title ||
          detail.name !== detail.original_name ? (
            <OriTitle>
              ( {detail.original_language} :{" "}
              {detail.original_title || detail.original_name} )
            </OriTitle>
          ) : null}
        </Titles>
        <TopBox>
          <div>
            <Runtime>
              {(detail.runtime && `${detail.runtime} min`) ||
                detail.episode_run_time.map((time, index) => (
                  <span key={index}>{`${time} min`}</span>
                ))}
            </Runtime>
            <Genres>
              {detail.genres.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
          </div>
          <div>
            <ReleaseDate>
              {detail.release_date ||
                `${detail.first_air_date} ~ ${detail.last_air_date}`}
            </ReleaseDate>
            <VoteContainer>
              <VoteAverage>
                <span>{`${detail.vote_average} / 10`}</span>
                <i className="fas fa-star"></i>
              </VoteAverage>
              <VoteCount>{`${detail.vote_count} votes`}</VoteCount>
            </VoteContainer>
          </div>
        </TopBox>
        {detail.seasons ? (
          <Scroller visible={detail.seasons.length > 3}>
            <Seasons>
              {detail.seasons.map((season) => (
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
          </Scroller>
        ) : null}
        <BottomBox isNoVideo={isNoVideo}>
          <Videos isNoVideo={isNoVideo}>
            {detail.videos.results.map((video) => (
              <Video
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
              ></Video>
            ))}
          </Videos>
          <Overview>{detail.overview}</Overview>
        </BottomBox>
      </div>
    </Container>
  );
}

export default Detail;
