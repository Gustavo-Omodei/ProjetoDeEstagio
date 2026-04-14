import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
  }

  body {
    background-color: #fff;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  li {
    margin-top: 1vw;
  }

  .navbar {
    width: 100%;
  }

  .nav-link {
    color: #000000;
    font-weight: bold;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    li {
      margin-top: 8px;
    }
  }
`;

export default GlobalStyle;
