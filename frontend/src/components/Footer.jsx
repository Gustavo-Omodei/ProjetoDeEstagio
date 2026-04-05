import { FaInstagramSquare } from "react-icons/fa";
import styled from "styled-components";
import { Button } from "../styles/styles";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #ffffff;
  color: #333;
  text-align: center;
  padding: 15px 0;
  margin-top: auto; /* faz grudar no final */
  font-size: 14px;
`;

function Footer() {
  return (
    <FooterContainer
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: "#fcf7f2",
        border: "1px solid #ddd",
      }}
    >
      <ul style={{ marginTop: "20px" }}>
        <b>Institucional</b>
        <li>Sobre a Londrilar</li>
        <li>Responsabilidade social</li>
      </ul>
      <ul style={{ marginTop: "20px" }}>
        <b>Guia de navegação</b>
        <li>Móveis para Sala de Estar</li>
        <li>Móveis para Quarto</li>
        <li>Móveis para Cozinha</li>
      </ul>
      <ul style={{ marginTop: "20px" }}>
        <b>Serviços</b>
        <li>Tipos de entrega</li>
        <li>Cadastro de produtos</li>
      </ul>
      <ul style={{ marginTop: "20px" }}>
        <b>Atendimento</b>
        <li>Central de ajuda</li>
        <li>Compre pelo WhatsApp</li>
      </ul>
      <div
        style={{
          marginTop: "20px",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <img src="/assets/logo.png" alt="" style={{ height: "40px" }} />
        <div
          style={{
            marginTop: "10px",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Button
            onClick={() =>
              window.open("https://www.instagram.com/londrilar_decor")
            }
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <img
              src="/assets/instagram.png"
              alt="Instagram"
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </Button>
          <Button
            style={{
              width: "30px",
              height: "30px",
              padding: "0",
              borderRadius: "50%",
            }}
          >
            <img src="/assets/facebook.png" alt="Facebook" />
          </Button>
          <Button style={{ width: "30px", height: "30px", padding: "0" }}>
            teste
          </Button>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
