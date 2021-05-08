import React from "react";
import styled from "styled-components";
import ListMaker from "../../Components/ListMaker";

const Container = styled.div``;

function Tvs({ tvs: { airingToday, onTheAir, topRated }, error }) {
  return (
    <Container>
      <ListMaker list={airingToday} title="Airing today" isMovie={false} />
      <ListMaker list={onTheAir} title="On the air" isMovie={false} />
      <ListMaker list={topRated} title="Top rated" isMovie={false} />
    </Container>
  );
}

export default Tvs;
