import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }
    
    body {
        background-color: #f2f2f2;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    `;
export default GlobalStyle;
