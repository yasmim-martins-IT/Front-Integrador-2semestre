// Importa os hooks useEffect e useState do React
import { useEffect, useState } from 'react';
// Importa as funções da API para listar e deletar sensores
import { getSensoresPorTipo, deleteSensor } from '../services/API';
// Importa o CSS module para estilização
import styles from './Sensor.module.css';
// Importa o hook useNavigate para redirecionar entre rotas
import { useNavigate } from 'react-router-dom';

export function SensorLuminosidade() {
  // Estado que armazena a lista de sensores
  const [sensores, setSensores] = useState([]);
  // Estado que indica o carregamento
  const [loading, setLoading] = useState(true);
  // Estado que armazena mensagens de erro
  const [erro, setErro] = useState(null);

  // Hook para redirecionar o usuário
  const navigate = useNavigate();

  // useEffect para buscar os sensores quando o componente for montado
  useEffect(() => {
    async function fetchData() {
      try {
        // Busca os sensores filtrados por tipo "luminosidade"
        const response = await getSensoresPorTipo('luminosidade');
        setSensores(response || []);
      } catch (error) {
        console.error('Erro ao buscar sensores pelo tipo', error);
        setErro(error); // Salva o erro no estado
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    }

    fetchData();
  }, []);

  // Função para deletar o sensor pelo id
  async function deletarSensor(id) {
    try {
      await deleteSensor(id); // Chama a API para deletar
      // Atualiza o estado removendo o sensor deletado da lista
      setSensores((prevSensores) => prevSensores.filter((sensor) => sensor.id !== id));
    } catch (error) {
      console.error('Erro ao deletar sensor', error);
      setErro(error); // Salva o erro para exibir ao usuário
    }
  }

  // Redireciona para a tela de cadastro
  function irParaCadastro() {
    navigate('/initial/cadastroSensor');
  }

  // Exibe mensagens enquanto carrega ou em caso de erro
  if (loading) return <p>Carregando sensores...</p>;
  if (erro) return <p>Erro ao carregar sensores.</p>;

  return (
    <main className={styles.container}>
      <h1>LUMINOSIDADE</h1>
      {/* Botão que leva para a tela de cadastro */}
      <button onClick={irParaCadastro} className={styles.botao_cadastro}>
        Cadastrar Novo Sensor
      </button>

      {/* Condicional que verifica se há sensores */}
      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {sensores.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              // Redireciona para a tela de gráficos ao clicar no card
              onClick={() => navigate(`/initial/graficos/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{item.sensor}</h2>
              <p>
                <strong>Tipo:</strong> {item.tipo}
              </p>
              <p>
                <strong>Latitude:</strong> {item.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {item.longitude}
              </p>
              <p>
                <strong>MAC Address:</strong> {item.mac_address}
              </p>
              <p>
                <strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}
              </p>
              {/* Botão que deleta o sensor atual */}
              <button
                className={styles.botao}
                onClick={(e) => {
                  e.stopPropagation(); // Evita que o clique propague para o card e redirecione
                  deletarSensor(item.id); // Chama a função para deletar
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
