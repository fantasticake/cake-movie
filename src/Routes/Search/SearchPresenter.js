import React from "react";
import styled from "styled-components";
import Loading from "../../Components/Loading";
import ListMaker from "../../Components/ListMaker";

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-top: 30px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 50px;
  width: 300px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #f7e8e8;
  color: #8785a2;
  cursor: text;
  border-radius: 5px;
  box-shadow: rgba(255, 199, 199, 0.4) 5px 5px,
    rgba(255, 199, 199, 0.3) 10px 10px, rgba(255, 199, 199, 0.2) 15px 15px,
    rgba(255, 199, 199, 0.1) 20px 20px, rgba(255, 199, 199, 0.05) 25px 25px;
  ::placeholder {
    font-size: 22px;
    color: #8785a2;
    opacity: 0.55;
  }
  :focus {
    ::placeholder {
      opacity: 0;
    }
  }
`;

function Search({ input, onChange, movies, tvs, error, isLoading }) {
  return (
    <Container>
      <Form>
        <Input
          value={input}
          placeholder="Search..."
          onChange={onChange}
        ></Input>
      </Form>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {movies.length ? (
            <ListMaker list={movies} title="Movies" isMovie={true} />
          ) : null}
          {tvs.length ? (
            <ListMaker list={tvs} title="Tvs" isMovie={false} />
          ) : null}
        </div>
      )}
    </Container>
  );
}

export default Search;
