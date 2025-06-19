// Importa os hooks do React
import { useEffect, useState } from 'react';
// Importa funções da API para buscar e deletar sensores
import { getSensoresPorTipo, deleteSensor } from '../services/API';
// Importa os estilos CSS modularizados
import styles from './Sensor.module.css';
// Importa o hook de navegação do React Router
import { useNavigate } from 'react-router-dom';

// Componente principal para listar sensores de umidade
export function SensorUmidade() {
  // Estado para armazenar os sensores retornados pela API
  const [sensores, setSensores] = useState([]);
  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(true);
  // Estado para capturar erros de requisição
  const [erro, setErro] = useState(null);

  // Hook para navegação programática entre páginas
  const navigate = useNavigate();

  // useEffect para buscar os sensores de umidade quando o componente carregar
  useEffect(() => {
    async function fetchData() {
      try {
        // Faz requisição para obter sensores do tipo "umidade"
        const response = await getSensoresPorTipo("umidade");
        // Atualiza o estado com os sensores recebidos
        setSensores(response || []);
      } catch (error) {
        // Caso ocorra erro, armazena no estado e exibe no console
        console.error("Erro ao buscar sensores pelo tipo", error);
        setErro(error);
      } finally {
        // Finaliza o carregamento, independente de sucesso ou erro
        setLoading(false);
      }
    }

    // Chama a função para buscar os dados
    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para deletar um sensor específico
  async function deletarSensor(id) {
    try {
      // Faz requisição para deletar o sensor pelo ID
      await deleteSensor(id);
      // Atualiza o estado removendo o sensor deletado da lista
      setSensores((prevSensores) => prevSensores.filter(sensor => sensor.id !== id));
    } catch (error) {
      console.error("Erro ao deletar sensor", error);
      setErro(error);
    }
  }

  // Função para redirecionar o usuário para a tela de cadastro de sensores
  function irParaCadastro() {
    navigate('/initial/cadastroSensor');
  }

  // Exibe mensagem de carregamento enquanto busca os dados
  if (loading) return <p>Carregando sensores...</p>;

  // Exibe mensagem de erro se a requisição falhar
  if (erro) return <p>Erro ao carregar sensores.</p>;

  // Renderização do conteúdo principal
  return (
    <main className={styles.container}>
      <h1>UMIDADE</h1>

      {/* Botão para navegar para a página de cadastro de sensores */}
      <button onClick={irParaCadastro} className={styles.botao_cadastro}>
        Cadastrar Novo Sensor
      </button>

      {/* Se não houver sensores encontrados */}
      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        // Renderiza a lista de sensores em formato de grid
        <div className={styles.grid}>
          {sensores.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              // Ao clicar no card, navega para a página de gráficos do sensor
              onClick={() => navigate(`/initial/graficos/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{item.sensor}</h2>
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Latitude:</strong> {item.latitude}</p>
              <p><strong>Longitude:</strong> {item.longitude}</p>
              <p><strong>MAC Address:</strong> {item.mac_address}</p>
              <p><strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}</p>

              {/* Botão para deletar o sensor */}
              <button
                className={styles.botao}
                onClick={(e) => {
                  // Impede que o clique no botão também dispare o clique no card (evitando navegação para o gráfico)
                  e.stopPropagation();
                  deletarSensor(item.id);
                }}
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
