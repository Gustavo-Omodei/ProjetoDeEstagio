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
        background-color: #fff   ;
        width: 100%;
        height: 100%;
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
    `;
export default GlobalStyle;
