// Importa os hooks useState e useEffect do React
import { useState, useEffect } from 'react'
// Importa o CSS module para estilização
import styles from './Ambientes.module.css'
// Importa a função que busca os ambientes da API
import { getAmbientes } from '../services/API'
// Importa o hook useNavigate para redirecionar o usuário entre páginas
import { useNavigate } from 'react-router-dom'

export function Ambientes() {
  // Estado que armazena o array de ambientes
  const [ambientes, setAmbientes] = useState([])
  // Estado que armazena se o componente ainda está carregando
  const [loading, setLoading] = useState(true)
  // Estado para armazenar erro, caso aconteça
  const [erro, setErro] = useState(null)
  // Instancia o navigate para mudar de rota
  const navigate = useNavigate()

  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    async function fetchData() {
      try {
        // Obtém a lista de ambientes da API
        const response = await getAmbientes()
        setAmbientes(response || [])
      } catch (error) {
        // Caso haja erro na requisição
        console.error('Erro ao buscar ambientes', error)
        setErro(error)
      } finally {
        // Finaliza o estado de loading
        setLoading(false)
      }
    }

    fetchData()
  }, []) // [] para executar apenas uma vez quando o componente for montado

  // Função que redireciona o usuário para a tela de cadastro de ambientes
  function irParaCadastro() {
    navigate('/initial/cadastroAmbientes')
  }

  return (
    <main className={styles.container}>
      <h1>AMBIENTES</h1>

      {/* Botão que leva para a tela de cadastro */}
      <button onClick={irParaCadastro} className={styles.botao_cadastro}>
        Cadastrar Novo Ambiente
      </button>

      {/* Renderização condicional: se não há ambientes, mostra uma mensagem */}
      {ambientes.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {/* Faz o map para cada ambiente */}
          {ambientes.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* Dados do ambiente */}
              <h2>{item.sensor}</h2>
              <h2>
                <strong>Sig:</strong> {item.sig}
              </h2>
              <p>
                <strong>Descrição:</strong> {item.descricao}
              </p>
              <p>
                <strong>Ni:</strong> {item.ni}
              </p>
              <p>
                <strong>Responsavel:</strong> {item.responsavel}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
