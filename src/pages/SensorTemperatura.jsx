// Importação de hooks do React
import { useEffect, useState } from 'react';
// Importação de hook para navegação entre páginas
import { useNavigate } from 'react-router-dom';
// Importação das funções da API para buscar e deletar sensores
import { getSensoresPorTipo, deleteSensor } from '../services/API';
// Importação de estilos CSS modularizados
import styles from './Sensor.module.css';

// Componente principal para exibir sensores de temperatura
export function SensorTemperatura() {
  // Estado para armazenar os sensores recebidos da API
  const [sensores, setSensores] = useState([]);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  // Estado para capturar possíveis erros
  const [erro, setErro] = useState(null);

  // Hook para navegação programática entre rotas
  const navigate = useNavigate();

  // useEffect para buscar sensores ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        // Chamada da API para buscar sensores do tipo "temperatura"
        const response = await getSensoresPorTipo("temperatura");
        // Atualiza o estado com os sensores obtidos
        setSensores(response || []);
      } catch (error) {
        // Captura e armazena erro, se houver
        console.error("Erro ao buscar sensores pelo tipo", error);
        setErro(error);
      } finally {
        // Finaliza o carregamento independentemente do resultado
        setLoading(false);
      }
    }

    // Chama a função de busca de dados
    fetchData();
  }, []); // Dependências vazias => executa apenas uma vez no carregamento

  // Função para deletar um sensor específico
  async function deletarSensor(id) {
    try {
      // Chamada da API para deletar o sensor pelo ID
      await deleteSensor(id);
      // Atualiza a lista de sensores, removendo o que foi deletado
      setSensores((prevSensores) => prevSensores.filter(sensor => sensor.id !== id));
    } catch (error) {
      console.error("Erro ao deletar sensor", error);
      setErro(error);
    }
  }

  // Função para redirecionar para a página de cadastro de novo sensor
  function irParaCadastro() {
    navigate('/initial/cadastroSensor');
  }

  // Renderização condicional: se ainda está carregando
  if (loading) return <p>Carregando sensores...</p>;
  // Se ocorreu erro na busca
  if (erro) return <p>Erro ao carregar sensores.</p>;

  // Renderização final
  return (
    <main className={styles.container}>
      <h1>TEMPERATURA</h1>

      {/* Botão para ir para o cadastro de novo sensor */}
      <div>
        <button onClick={irParaCadastro} className={styles.botao_cadastro}>
          Cadastrar Novo Sensor
        </button>
      </div>

      {/* Caso não haja sensores */}
      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        // Exibição em grid de cada sensor
        <div className={styles.grid}>
          {sensores.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/initial/graficos/${item.id}`)} // Navega para os gráficos do sensor
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
                  e.stopPropagation(); // Impede que o clique propague para o card e abra o gráfico
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
