import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  i {
    font-size: min(300px, 100vh);
    color: #ffc7c7;
    opacity: 0.7;
    animation: move 1s infinite ease-in-out;
  }
  @keyframes move {
    0% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }
`;

const Loading = () => {
  return (
    <Container>
      <i className="fas fa-birthday-cake"></i>
    </Container>
  );
};

export default Loading;
