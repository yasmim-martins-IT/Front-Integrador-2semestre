// Importa os hooks do React
import { useEffect, useState } from 'react';
// Importa a função da API para buscar sensores por tipo e deletar um sensor
import { getSensoresPorTipo, deleteSensor } from '../services/API';
// Importa o CSS module para estilos
import styles from './Sensor.module.css';
// Importa o componente que desenha gráficos (não está sendo usado aqui diretamente)
import { ChartCard } from '../components/Cards';
// Importa o hook para navegação entre páginas
import { useNavigate } from 'react-router-dom';

export function SensorContador() {
  // Estado que armazena a lista de sensores
  const [sensores, setSensores] = useState([]);
  // Estado que representa o carregamento inicial
  const [loading, setLoading] = useState(true);
  // Estado que armazena um erro, caso ocorra
  const [erro, setErro] = useState(null);

  // Hook de navegação entre rotas
  const navigate = useNavigate();

  // Busca os sensores do tipo "contador" quando o componente monta
  useEffect(() => {
    async function fetchData() {
      try {
        // Chama a API que retorna os sensores filtrados
        const response = await getSensoresPorTipo('contador');
        setSensores(response || []); // Atualiza o estado
      } catch (error) {
        console.error('Erro ao buscar sensores pelo tipo', error);
        setErro(error); // Salva o erro para exibir
      } finally {
        setLoading(false); // Encerra o estado de loading
      }
    }

    fetchData();
  }, []);

  // Função que deleta o sensor da API e atualiza a lista local
  async function deletarSensor(id) {
    try {
      await deleteSensor(id); // Deleta da API
      // Atualiza o estado local removendo o sensor deletado
      setSensores((prevSensores) => prevSensores.filter((sensor) => sensor.id !== id));
    } catch (error) {
      console.error('Erro ao deletar sensor', error);
      setErro(error); // Salva o erro para exibir
    }
  }

  // Redireciona para a tela de cadastro quando o botão for clicado
  function irParaCadastro() {
    navigate('/initial/cadastroSensor');
  }

  // Condição que exibe mensagem de loading
  if (loading) return <p>Carregando sensores...</p>;
  // Condição que exibe erro
  if (erro) return <p>Erro ao carregar sensores.</p>;

  return (
    <main className={styles.container}>
      <h1>CONTADOR</h1>

      {/* Botão que leva para a tela de cadastro */}
      <button onClick={irParaCadastro} className={styles.botao_cadastro}>
        Cadastrar Novo Sensor
      </button>

      {/* Lista de sensores ou mensagem de que não há dados */}
      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {sensores.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/initial/graficos/${item.id}`)} // Redireciona para a tela de gráficos
              style={{ cursor: 'pointer' }}
            >
              {/* Informações básicas do sensor */}
              <h2>{item.sensor}</h2>
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Latitude:</strong> {item.latitude}</p>
              <p><strong>Longitude:</strong> {item.longitude}</p>
              <p><strong>MAC Address:</strong> {item.mac_address}</p>
              <p><strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}</p>

              {/* Botão para deletar o sensor, com parada da propagação para evitar que o click propague até o div */}
              <button
                className={styles.botao}
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o click no botão também acione o onClick da div
                  deletarSensor(item.id); // Chama a função para deletar o sensor
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

