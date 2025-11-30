import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import {
  Container,
  HeroSection,
  HeroImg,
  FavIcon,
  Left,
  Title,
  Desc,
  Price,
  Button,
  Right,
  OffersTitle,
  Card,
  CardTitle,
  CardImg,
  CardValue,
  PageContainer,
} from "../styles/styles";
import GlobalStyle from "../styles/global";
import Grid from "../components/Grid";
import { useNavigate } from "react-router-dom";

function Home() {
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/modelos")
      .then((res) => setModelos(res.data))
      .catch((err) => console.error("Erro ao carregar modelos:", err));
  }, []);

  return (
    <PageContainer>
      <Container>
        {/* HERO */}
        <HeroSection>
          <Left>
            <Title>{modelos.length > 0 ? modelos[0].nome : "modelo"}</Title>
            <Desc>
              {modelos.length > 0
                ? modelos[0].descricao
                : "Descrição do modelo"}
            </Desc>
            <Price>
              {modelos.length > 0
                ? `R$ ${Number(modelos[0].valor).toFixed(2)}`
                : "R$ ---"}
            </Price>
            <Button
              style={{ width: "200px" }}
              onClick={() =>
                navigate(`/produto/${modelos.length > 0 ? modelos[0].id : ""}`)
              }
            >
              Ver detalhes
            </Button>
          </Left>

          <Right>
            <HeroImg
              src={`http://localhost:8800${
                modelos.length > 0 ? modelos[0].imagem1 : ""
              }`}
              alt="Poltrona"
            />
          </Right>
        </HeroSection>

        {/* OFERTAS */}
        <OffersTitle>Ofertas especiais</OffersTitle>

        <Grid>
          {modelos.map((m) => (
            <Card key={m.id} onClick={() => navigate(`/produto/${m.id}`)}>
              <CardImg
                src={
                  m.imagem1
                    ? `http://localhost:8800${m.imagem1}`
                    : "https://i.imgur.com/1ZQ9Y8h.png"
                }
              />
              <CardTitle>{m.nome}</CardTitle>
              <CardValue>
                {m.valor ? `R$ ${Number(m.valor).toFixed(2)}` : "R$ ---"}
              </CardValue>

              <FavIcon>
                <FaRegHeart />
              </FavIcon>
            </Card>
          ))}
        </Grid>
        <GlobalStyle />
      </Container>
    </PageContainer>
  );
}

export default Home;
