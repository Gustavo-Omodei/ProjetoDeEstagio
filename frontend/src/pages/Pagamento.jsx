import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

export default function Pagamento() {
  const location = useLocation()
  const navigate = useNavigate()
  const [carregando, setCarregando] = useState(true)
  const { user, token } = useContext(AuthContext)

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await api.get('/pedido/itens', {
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (e) {
        console.error(e)
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [token])

  const dados = location.state

  if (!dados) {
    navigate('/carrinho')
    return null
  }

  const { itens, subtotal, frete, total } = dados

  const irParaPagamento = async () => {
    try {
      const response = await api.post('/pagamentos/criar-preferencia', {
        descricao: 'Pedido Teste',
        valor: total,
        pedido_id: 1,
      })

      const { sandbox_init_point } = response.data

      window.location.href = sandbox_init_point
    } catch (error) {
      console.error('Erro ao criar preferência:', error)
    }
  }

  return (
    <div>
      <h1>Carrinho</h1>
      <button onClick={irParaPagamento}>Pagar com Mercado Pago</button>
    </div>
  )
}
