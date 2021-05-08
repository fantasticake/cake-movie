import React from "react";
import styled from "styled-components";
import ListMaker from "../../Components/ListMaker";

const Container = styled.div``;

const Home = ({ movies: { nowPlaying, upcoming, topRated }, error }) => {
  return (
    <Container>
      <ListMaker list={nowPlaying} title="Now playing" isMovie={true} />
      <ListMaker list={upcoming} title="Upcoming" isMovie={true} />
      <ListMaker list={topRated} title="Top rated" isMovie={true} />
    </Container>
  );
};

export default Home;
