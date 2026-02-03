import axios from "axios";
import { PageContainer, Layout, Button } from "../styles/styles";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";

export default function AtualizarTabelaFrete() {
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);

  async function importarTabela() {
    if (!arquivo) {
      alert("Selecione um arquivo");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      setLoading(true);
      await axios.post("http://localhost:8800/frete/importar", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Tabela de frete importada com sucesso!");
      setArquivo(null);
    } catch (error) {
      console.error("Erro ao importar tabela de frete:", error);
      alert("Erro ao importar tabela");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <h2>📦 Importar tabela de frete</h2>

      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 16,
          maxWidth: 500,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setArquivo(e.target.files[0])}
        />

        <Button
          style={{ width: "100%", marginTop: 20 }}
          onClick={importarTabela}
          disabled={loading}
        >
          {loading ? "Importando..." : "Importar tabela"}
        </Button>
      </div>
    </PageContainer>
  );
}
