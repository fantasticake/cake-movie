import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 80%;
`;

const Scroller = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 1;
  position: absolute;
  width: 100px;
  height: 250px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity 0.1s ease-in-out;
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
    opacity: 1;
  }
`;

export default ({ listRef, visible = true }) => {
  const refRScroller = useRef();
  const refLScroller = useRef();

  let requestId = null;
  const onMouseenter = (e, direction) => {
    const target = listRef.current;
    const startPos = target.scrollLeft;
    let start = null;
    const temp = (timestamp) => {
      if (start === null) start = timestamp;
      if (direction === "right")
        target.scrollLeft = startPos + (timestamp - start) * 0.8;
      else if (direction === "left")
        target.scrollLeft = startPos - (timestamp - start) * 0.8;
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
    const scrollerR = refRScroller.current;
    const scrollerL = refLScroller.current;
    if (scrollerR) {
      scrollerR.addEventListener("mouseenter", (e) => onMouseenter(e, "right"));
      scrollerR.addEventListener("mouseleave", onmouseleave);

      scrollerL.addEventListener("mouseenter", (e) => onMouseenter(e, "left"));
      scrollerL.addEventListener("mouseleave", onmouseleave);
    }
    return () => {
      if (scrollerR) {
        scrollerR.removeEventListener("mouseenter", (e) =>
          onMouseenter(e, "right")
        );
        scrollerR.removeEventListener("mouseleave", onmouseleave);

        scrollerL.removeEventListener("mouseenter", (e) =>
          onMouseenter(e, "left")
        );
        scrollerL.removeEventListener("mouseleave", onmouseleave);
      }
    };
  }, []);

  return (
    <Container>
      <Scroller visible={visible} ref={refLScroller} />
      <Scroller visible={visible} ref={refRScroller} />
    </Container>
  );
};
