import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
    ::selection {
      background-color: #8785a2;
    }
    outline-color: #f7e8e8;
    cursor: default;
    z-index: 0;
  }
  a {
    text-decoration: none;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    font-weight: 600;
    background-color: #8785a2;
    padding-top: 60px;
  }
`;

export default GlobalStyle;
