import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    body {
        background-color: #f2f2f2;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    .navbar {
        background-color: #ffff;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-link {
        color: #000000;
       justify-content: space-between;
        font-weight: bold;
        margin: 0 20px;
        text-decoration: none;

    }

    `;
export default GlobalStyle;
