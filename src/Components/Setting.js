import React, { useContext } from "react";
import styled from "styled-components";
import { SettingContext } from "./SettingContext";

const Container = styled.div`
  color: #8785a2;
`;

const SettingArea = styled.div`
  display: flex;
  position: fixed;
  top: 15px;
  right: -250px;
  background-color: #f7e8e8;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  flex-direction: column;
  padding: 30px;
  border-radius: 10px;
  transition: right 0.3s ease-in-out;
`;

const SetSearch = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SetIncludeAdult = styled.li``;

const Icon = styled.div`
  i {
    cursor: pointer;
  }
  font-size: 30px;
`;

function Setting() {
  const { includeAdult, setIncludeAdultLS } = useContext(SettingContext);
  return (
    <Container>
      <SettingArea
        onMouseLeave={(e) => {
          e.currentTarget.style.right = "-250px";
        }}
      >
        <SetSearch>
          <h6>Search</h6>
          <SetIncludeAdult>
            <label htmlFor="includeAdult">include adult : </label>
            <input
              id="includeAdult"
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => {
                setIncludeAdultLS(e.target.checked);
              }}
            ></input>
          </SetIncludeAdult>
        </SetSearch>
      </SettingArea>
      <Icon>
        <i
          className="fas fa-cog"
          onMouseEnter={(e) => {
            e.currentTarget.parentNode.parentNode.childNodes[0].style.right =
              "15px";
          }}
        ></i>
      </Icon>
    </Container>
  );
}

export default Setting;
