import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GlobalStyle from '../styles/global'
import api from '../api/api'
import {
  PageContainer,
  FormContainer,
  InputArea,
  Label,
  Input,
  Button,
} from '../styles/styles'

function Perfil() {
  const { user, updateUser } = useAuth()

  const [nome, setNome] = useState(user?.nome || '')
  const [mostrarEnderecos, setMostrarEnderecos] = useState(false)
  const [cpf, setCPF] = useState(user?.cpf || '')
  const [telefone, setTelefone] = useState(user?.telefone || '')
  const [email, setEmail] = useState(user?.email || '')
  const [enderecos, setEnderecos] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    setNome(user.nome || '')
    setEmail(user.email || '')
    setCPF(user.cpf || '')
    setTelefone(user.telefone || '')

    async function fetchEnderecos() {
      try {
        const response = await api.get(`/clientes/${user.id}/enderecos`)
        const dados = response.data?.enderecos || response.data || []
        setEnderecos(Array.isArray(dados) ? dados : [])
      } catch (e) {
        console.log('Erro:', e.response?.data || e.message)
      }
    }

    fetchEnderecos()
  }, [user])

  function handleEnderecoChange(index, field, value) {
    setEnderecos((prev) =>
      prev.map((endereco, i) =>
        i === index ? { ...endereco, [field]: value } : endereco
      )
    )
  }

  async function salvarEndereco(index) {
    try {
      const endereco = enderecos[index]

      console.log('Salvar endereço:', endereco)

      // ajuste depois conforme sua rota/backend
      // await api.put(`/enderecos/${endereco.id}`, endereco)

      toast.success(`Endereço ${index + 1} pronto para salvar`)
    } catch (error) {
      toast.error('Erro ao salvar endereço')
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) return toast.error('Por favor, insira seu email.')

    const payload = {
      nome,
      email,
      cpf,
      telefone,
    }

    try {
      const response = await api.put(`/clientes/${user.id}`, payload)
      const updatedUser = response.data.user
      updateUser(updatedUser)
      toast.success('Perfil atualizado!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!user) {
    return (
      <PageContainer>
        <h2>Você não está logado</h2>
        <Button onClick={() => navigate('/login')}>Ir para Login</Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <h1>Meu Perfil</h1>

      <FormContainer onSubmit={handleSubmit}>
        <InputArea>
          <Label>Nome</Label>
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>CPF</Label>
          <Input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
          <Input
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </InputArea>

        <Button type="submit">Salvar alterações</Button>
      </FormContainer>

      <div style={{ marginTop: 30 }}>
        <div
          onClick={() => setMostrarEnderecos(!mostrarEnderecos)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '14px 16px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            background: '#f8f8f8',
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px' }}>Meus endereços</h2>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {mostrarEnderecos ? '−' : '+'}
          </span>
        </div>

        {mostrarEnderecos && (
          <>
            {enderecos.length === 0 ? (
              <p>Nenhum endereço cadastrado.</p>
            ) : (
              enderecos.map((endereco, index) => (
                <div
                  key={endereco.id || index}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ marginBottom: 10 }}>
                    <strong>Endereço {index + 1}</strong>
                  </div>

                  <InputArea>
                    <Label>CEP</Label>
                    <Input
                      type="text"
                      value={endereco.cep || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'cep', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Rua</Label>
                    <Input
                      type="text"
                      value={endereco.rua || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'rua', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Bairro</Label>
                    <Input
                      type="text"
                      value={endereco.bairro || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'bairro', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Número</Label>
                    <Input
                      type="text"
                      value={endereco.numero || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'numero', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Complemento</Label>
                    <Input
                      type="text"
                      value={endereco.complemento || ''}
                      onChange={(e) =>
                        handleEnderecoChange(
                          index,
                          'complemento',
                          e.target.value
                        )
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Cidade</Label>
                    <Input
                      type="text"
                      value={endereco.cidade || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'cidade', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>Estado</Label>
                    <Input
                      type="text"
                      value={endereco.estado || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'estado', e.target.value)
                      }
                    />
                  </InputArea>

                  <InputArea>
                    <Label>País</Label>
                    <Input
                      type="text"
                      value={endereco.pais || ''}
                      onChange={(e) =>
                        handleEnderecoChange(index, 'pais', e.target.value)
                      }
                    />
                  </InputArea>

                  <Button
                    type="button"
                    onClick={() => salvarEndereco(index)}
                    style={{ marginTop: 10 }}
                  >
                    Salvar endereço
                  </Button>
                </div>
              ))
            )}
          </>
        )}
      </div>

      <GlobalStyle />
    </PageContainer>
  )
}

export default Perfil
