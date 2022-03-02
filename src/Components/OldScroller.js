import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Scroller = styled.div`
  position: absolute;
  width: 10%;
  height: 90%;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: background-color 0.1s ease-in-out;
  :first-child {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
  :last-child {
    right: 0;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const List = styled.div`
  width: 100%;
  z-index: -1;
  ul {
    ::-webkit-scrollbar {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }
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

export default ({ visible = true, children }) => {
  const refRScroller = useRef();
  const refLScroller = useRef();
  let requestId = null;
  const onMouseenter = (e, direction) => {
    const init = e.target.parentNode.childNodes[1].childNodes[0].scrollLeft;
    let start = null;
    const temp = (timestamp) => {
      if (start === null) start = timestamp;
      if (direction === "right")
        e.target.parentNode.childNodes[1].childNodes[0].scrollLeft =
          init + (timestamp - start) / 2;
      else if (direction === "left")
        e.target.parentNode.childNodes[1].childNodes[0].scrollLeft =
          init - (timestamp - start) / 2;
      requestId = requestAnimationFrame(temp);
    };
    requestId = requestAnimationFrame(temp);
  };
  const onmouseleave = () => {
    if (requestId) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  };
  useEffect(() => {
    if (refRScroller.current) {
      refRScroller.current.addEventListener("mouseenter", (e) =>
        onMouseenter(e, "right")
      );
      refRScroller.current.addEventListener("mouseleave", onmouseleave);
    }
    if (refLScroller.current) {
      refLScroller.current.addEventListener("mouseenter", (e) =>
        onMouseenter(e, "left")
      );
      refLScroller.current.addEventListener("mouseleave", onmouseleave);
    }
    return () => {
      if (refRScroller.current) {
        refRScroller.current.removeEventListener("mouseenter", (e) =>
          onMouseenter(e, "right")
        );
        refRScroller.current.removeEventListener("mouseleave", onmouseleave);
      }
      if (refLScroller.current) {
        refLScroller.current.removeEventListener("mouseenter", (e) =>
          onMouseenter(e, "left")
        );
        refLScroller.current.removeEventListener("mouseleave", onmouseleave);
      }
    };
  }, []);
  return (
    <Container>
      <Scroller visible={visible} ref={refLScroller} />
      <List>{children}</List>
      <Scroller visible={visible} ref={refRScroller} />
    </Container>
  );
};
