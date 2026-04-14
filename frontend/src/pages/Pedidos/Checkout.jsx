import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { FiMapPin, FiTruck, FiCreditCard } from 'react-icons/fi'
import {
  PageContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '../../styles/styles'
import GlobalStyle from '../../styles/global'

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [produtos, setProdutos] = useState([])
  const [pedido, setPedido] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!state) {
      navigate('/carrinho')
      return
    }

    setProdutos(state.produtos || [])
    setPedido({
      cliente: state.cliente,
      frete: state.frete,
      prazo: state.prazo,
      subtotal: state.subtotal,
      total: state.total,
      cep: state.cep,
    })
    setLoading(false)
  }, [state, navigate])

  async function confirmarPedido() {
    try {
      console.log('Criar pedido com:', {
        cliente: pedido.cliente,
        produtos,
        frete: pedido.frete,
        prazo: pedido.prazo,
      })

      // depois você encaixa sua chamada real:
      // const resp = await api.post('/pedido/criar', {
      //   cliente: pedido.cliente,
      //   produtos,
      //   frete: pedido.frete,
      //   prazo: pedido.prazo,
      // })

      // navigate(`/pedido/${resp.data.pedidoId}`, {
      //   state: { linkPagamento: resp.data.linkPagamento },
      // })
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <div>Carregando checkout...</div>
  if (!pedido) return <div>Checkout não encontrado.</div>

  return (
    <PageContainer style={{ maxWidth: '1280px' }}>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate('/carrinho')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#ab8d69',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          <FaArrowLeft />
          Voltar para o carrinho
        </button>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontWeight: 'bold',
            fontSize: '42px',
            marginBottom: 8,
            color: '#1f1f1f',
          }}
        >
          Checkout
        </h1>
        <p
          style={{
            color: '#7a7a7a',
            fontSize: 16,
            margin: 0,
          }}
        >
          Revise seus produtos, entrega e pagamento antes de finalizar.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ece7e2',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 24,
                color: '#2b2b2b',
              }}
            >
              Produtos ({produtos.length} itens)
            </h3>

            <Table>
              <Thead>
                <Tr>
                  <Th style={{ textAlign: 'start' }}>Produto</Th>
                  <Th>Quantidade</Th>
                  <Th>Valor unitário</Th>
                  <Th>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {produtos.map((p, index) => (
                  <Tr key={p.idProduto || p.id || index}>
                    <Td style={{ textAlign: 'start' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                        }}
                      >
                        <img
                          src={p.imagem1 || '/placeholder.png'}
                          alt={p.nomeExibicao || 'Produto'}
                          style={{
                            width: 76,
                            height: 76,
                            objectFit: 'cover',
                            borderRadius: 12,
                            border: '1px solid #eee',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: '#222',
                              marginBottom: 4,
                            }}
                          >
                            {p.nomeExibicao || 'Produto'}
                          </div>
                          <div
                            style={{
                              color: '#8b8b8b',
                              fontSize: 14,
                            }}
                          >
                            Código: {p.idProduto || p.id || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </Td>

                    <Td>{p.quantidade}</Td>

                    <Td>
                      {Number(p.preco || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Td>

                    <Td>
                      {(
                        Number(p.preco || 0) * Number(p.quantidade || 0)
                      ).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #ece7e2',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 22,
                color: '#2b2b2b',
              }}
            >
              Entrega
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                color: '#444',
                marginBottom: 14,
              }}
            >
              <FiMapPin size={18} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600 }}>CEP</div>
                <div style={{ color: '#777' }}>{pedido.cep}</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                color: '#444',
              }}
            >
              <FiTruck size={18} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Prazo estimado</div>
                <div style={{ color: '#777' }}>{pedido.prazo} dias</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ece7e2',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 20,
                fontSize: 24,
                color: '#2b2b2b',
              }}
            >
              Resumo do pedido
            </h3>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 14,
                color: '#555',
              }}
            >
              <span>Subtotal</span>
              <span>
                {Number(pedido.subtotal || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 18,
                color: '#555',
              }}
            >
              <span>Frete</span>
              <span>
                {Number(pedido.frete || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>

            <div
              style={{
                borderTop: '1px solid #eee',
                paddingTop: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#222',
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#9a7048',
                }}
              >
                {Number(pedido.total || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>

            <Button
              type="button"
              onClick={confirmarPedido}
              style={{
                width: '100%',
                fontSize: 16,
              }}
            >
              Finalizar pedido
            </Button>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #ece7e2',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 22,
                color: '#2b2b2b',
              }}
            >
              Informações do pagamento
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                color: '#444',
              }}
            >
              <FiCreditCard size={18} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Forma de pagamento</div>
                <div style={{ color: '#777' }}>Mercado Pago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GlobalStyle />
    </PageContainer>
  )
}
