import { useEffect, useState } from 'react';
import { getSensoresPorTipo } from '../services/API';
import styles from './Sensor.module.css'; // Ajuste se o caminho do CSS for diferente
import { ChartCard } from '../components/Cards'; // Ajuste se necessário

export function SensorLuminosidade() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSensoresPorTipo("umidade");
        setSensores(response || []); // Ajuste: se API retorna response.data
      } catch (error) {
        console.error("Erro ao buscar sensores pelo tipo", error);
        setErro(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando sensores...</p>;
  if (erro) return <p>Erro ao carregar sensores.</p>;

  return (
    <main className={styles.container}>
      <h1>Bem vindo ao visualizador de Sensores de temperatura</h1>

      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.infos}>
          <ul className={styles.lista}>
            {sensores.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.infos}>
                    <p><strong className={styles.texto}>Nome:{item.sensor} </strong>  </p>
                    <p><strong className={styles.texto}>Tipo: {item.tipo} </strong></p> </div>
                <div className={styles.infos}>    
                    <p><strong className={styles.texto}>Latitude : {item.latitude} </strong> </p>
                    <p><strong className={styles.texto}>Longitude: {item.longitude}</strong> </p>
                
                </div>
                <div className={styles.infos}>
                    <p><strong className={styles.texto}>Mac_adress: {item.mac_address} </strong> </p>
                    <p><strong className={styles.texto}>Status: {item.status ? "Ativo" : "Inativo" } </strong></p>
                </div>
             
                
              </li>
            ))}
          </ul>
        </div>
      )}
       <div className={styles.graficos}>
                <ChartCard title="Tempo ativo em horas" type="pie" />     
                <ChartCard title="Tempo ativo em horas" type="bar" />     
        </div>

      <div id={styles.graficoLine}>
        <ChartCard title="Tempo ativo em horas" type="line" />
      </div>
    </main>
  );
}
