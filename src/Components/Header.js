import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Setting from "./Setting";

const Contianer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: #f7e8e8;
  width: 100%;
  padding-right: 25px;
  height: 60px;
  top: 0;
  z-index: 10;
`;

const List = styled.ul`
  height: 100%;
  display: flex;
`;

const Item = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
`;

const SLink = styled(Link)`
  cursor: pointer;
  transition: border-bottom 0.3s;
  &:hover {
    border-bottom: solid 10px #ffc7c7;
  }
  border-bottom: solid 10px
    ${(props) => (props.iscurrent === "true" ? "#ffc7c7" : "transparent")};
  color: #10002b;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 25px;
  font-size: 28px;
`;

function Header({ location: { pathname } }) {
  return (
    <Contianer>
      <List>
        <Item>
          <SLink
            to="/movies"
            iscurrent={pathname === "/movies" ? "true" : "false"}
          >
            Movies
          </SLink>
        </Item>
        <Item>
          <SLink to="/tvs" iscurrent={pathname === "/tvs" ? "true" : "false"}>
            Tvs
          </SLink>
        </Item>
        <Item>
          <SLink
            to="/search"
            iscurrent={pathname === "/search" ? "true" : "false"}
          >
            Search
          </SLink>
        </Item>
      </List>
      <List>
        <Item>
          <Setting />
        </Item>
      </List>
    </Contianer>
  );
}

export default withRouter(Header);
