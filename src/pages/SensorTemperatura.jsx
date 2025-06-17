import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSensoresPorTipo, deleteSensor } from '../services/API';
import styles from './Sensor.module.css';
import { ChartCard } from '../components/Cards';

export function SensorTemperatura() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSensoresPorTipo("temperatura");
        setSensores(response || []);
      } catch (error) {
        console.error("Erro ao buscar sensores pelo tipo", error);
        setErro(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function deletarSensor(id) {
    try {
      await deleteSensor(id);
      setSensores((prevSensores) => prevSensores.filter(sensor => sensor.id !== id));
    } catch (error) {
      console.error("Erro ao deletar sensor", error);
      setErro(error);
    }
  }

function irParaCadastro() {
  navigate('/initial/cadastroSensor');
}


  if (loading) return <p>Carregando sensores...</p>;
  if (erro) return <p>Erro ao carregar sensores.</p>;

  return (
    <main className={styles.container}>
      <h1>TEMPERATURA</h1>
      <div>
            <button onClick={irParaCadastro} className={styles.botao_cadastro}>
        Cadastrar Novo Sensor
      </button>

      </div>
  
      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {sensores.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                onClick={() => navigate(`/initial/graficos/${item.id}`)} 
                style={{ cursor: 'pointer' }}
              >
              <h2>{item.sensor}</h2>
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Latitude:</strong> {item.latitude}</p>
              <p><strong>Longitude:</strong> {item.longitude}</p>
              <p><strong>MAC Address:</strong> {item.mac_address}</p>
              <p><strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}</p>
              <button className={styles.botao} onClick={() => deletarSensor(item.id)}>Deletar</button>
            </div>
          ))}
        </div>
      )}


    </main>
  );
}
