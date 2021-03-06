import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import defaultImg from "../images/defaultImg.jpg";
import Scroller from "./Scroller";

const Container = styled.ul`
  margin-top: 30px;
  margin-bottom: 30px;
  color: #f7e8e8;
`;

const ContainerTitle = styled.h3`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 20px;
  text-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
`;

const ListBox = styled.div`
  margin: 0 20px;
  position: relative;
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

const List = styled.ul`
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

const Votes = styled.span`
  position: absolute;
  bottom: 75px;
  color: #ffeaa7;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  gap: 4px;
`;

const Poster = styled.img`
  z-index: -1;
  cursor: pointer;
  border-radius: 20px;
  height: 250px;
  transition: border-radius 0.3s ease-in-out, filter 0.3s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Item = styled.ul`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  :hover {
    ${Poster} {
      filter: brightness(0.8);
    }
    ${Votes} {
      opacity: 1;
    }
  }
`;

const Title = styled.h5`
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  color: #f7e8e8;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;

const ListMaker = ({ list, title, isMovie }) => {
  const listRef = useRef();
  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ListBox>
        <Scroller listRef={listRef} visible={list.length > 5} />
        <List ref={listRef}>
          {list.map((item) => (
            <Link to={(isMovie ? "movies/" : "tvs/") + item.id} key={item.id}>
              <Item>
                <Votes>
                  <span>{`${item.vote_average} / 10`}</span>
                  <i className="fas fa-star"></i>
                </Votes>
                <Poster
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
                      : defaultImg
                  }
                  alt={item.title || item.name}
                />
                <Title>
                  {item.title && item.title.length > 17
                    ? item.title.slice(0, 17)
                    : item.title}
                  {item.name && item.name.length > 17
                    ? item.name.slice(0, 17)
                    : item.name}
                </Title>
              </Item>
            </Link>
          ))}
        </List>
      </ListBox>
    </Container>
  );
};

export default ListMaker;
