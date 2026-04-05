import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar({ produtos = [] }) {
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sugestoes = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return [];

    const nomesUnicos = [
      ...new Set(
        produtos
          .map((p) => p.nome || p.descricao || "")
          .filter(Boolean)
          .filter((nome) => nome.toLowerCase().includes(termo)),
      ),
    ];

    return nomesUnicos.slice(0, 5);
  }, [busca, produtos]);

  const produtosSugeridos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return [];

    return produtos
      .filter((p) => {
        const nome = String(p.nome || p.descricao || "").toLowerCase();
        const categoria = String(p.categoria || "").toLowerCase();
        const sku = String(p.sku || "").toLowerCase();
        const imagem = String(p.imagem1 || "").toLowerCase();
        return (
          nome.includes(termo) ||
          categoria.includes(termo) ||
          sku.includes(termo) ||
          imagem.includes(termo)
        );
      })
      .slice(0, 4);
  }, [busca, produtos]);

  const buscarPaginaResultados = (termo = busca) => {
    if (!termo.trim()) return;
    setAberto(false);
    navigate(`/produtos?busca=${encodeURIComponent(termo)}`);
  };

  const abrirProduto = (id) => {
    setAberto(false);
    navigate(`/produto/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscarPaginaResultados();
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Busque aqui seu produto"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setAberto(true);
          }}
          onFocus={() => {
            if (busca.trim()) setAberto(true);
          }}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "4px 16px",
            fontSize: "16px",
          }}
        />

        <FaSearch
          onClick={() => buscarPaginaResultados()}
          style={{
            border: "none",
            cursor: "pointer",
            padding: "0",
            marginRight: "16px",
            fontSize: "20px",
          }}
        />
      </div>

      {aberto && busca.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: "100%",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            overflow: "hidden",
            zIndex: 999,
            minHeight: "260px",
          }}
        >
          <div
            style={{
              borderRight: "1px solid #eee",
              padding: "20px",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "18px" }}>Sugestões</h3>

            {sugestoes.length > 0 ? (
              sugestoes.map((sugestao, index) => (
                <div
                  key={index}
                  onClick={() => buscarPaginaResultados(sugestao)}
                  style={{
                    padding: "10px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>🔍</span>
                  <span>{sugestao}</span>
                </div>
              ))
            ) : (
              <p style={{ color: "#777" }}>Nenhuma sugestão encontrada.</p>
            )}
          </div>

          <div style={{ padding: "20px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "18px" }}>
              Resultado da pesquisa
            </h3>

            {produtosSugeridos.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "18px",
                }}
              >
                {produtosSugeridos.map((produto) => (
                  <div
                    key={produto.id}
                    onClick={() => abrirProduto(produto.id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={`http://localhost:8800${produto.imagem1}`}
                      alt={produto.nome || produto.descricao}
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />

                    <p
                      style={{
                        fontSize: "14px",
                        margin: "0 0 8px 0",
                        textAlign: "center",
                      }}
                    >
                      {produto.nome}
                    </p>

                    <strong style={{ fontSize: "16px" }}>
                      {Number(produto.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#777" }}>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
