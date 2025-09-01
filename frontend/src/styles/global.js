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
        background-color: #FFFFFF   ;
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
        border: 1px solid #E0E0E0;
    }

    .nav-link {
        color: #000000;
       justify-content: space-between;
        font-weight: bold;
        margin: 0 20px;
        text-decoration: none;
    }

    ul{
        list-style: none;
        padding: 0;
        text-align: left;
    }
        li{
        margin-top: 1vw
        }

    select{
        height: 36px;
        padding: 0 10px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        margin-bottom: 10px;
    `;
export default GlobalStyle;
