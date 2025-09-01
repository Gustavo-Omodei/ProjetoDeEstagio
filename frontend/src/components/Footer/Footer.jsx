import styled from "styled-components";

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
    <FooterContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <ul>
          <b>Institucional</b>
          <li>Sobre a Londrilar</li>
          <li>Responsabilidade social</li>
        </ul>
        <ul>
          <b>Guia de navegação</b>
          <li>Móveis para Sala de Estar</li>
          <li>Móveis para Quarto</li>
          <li>Móveis para Cozinha</li>
        </ul>
        <ul>
          <b>Serviços</b>
          <li>Tipos de entrega</li>
          <li>Cadastro de produtos</li>
        </ul>
        <ul>
          <b>Atendimento</b>
          <li>Central de ajuda</li>
          <li>Compre pelo WhatsApp</li>
        </ul>
      </div>
    </FooterContainer>
  );
}

export default Footer;
