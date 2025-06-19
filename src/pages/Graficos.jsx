// Importa hooks e utilitários do React e react-router
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Importa o CSS module para estilização
import styles from './Graficos.module.css';
// Importa a função da API para buscar um sensor pelo ID
import { getSensorPorId } from '../services/API';
// Importa o componente que renderiza gráficos
import { ChartCard } from '../components/Cards';

export function PaginaGraficos() {
  // Obtém o id da rota (ex: /graficos/:id)
  const { id } = useParams();

  // Estado que armazena o sensor buscado
  const [sensor, setSensor] = useState(null);
  // Estado que armazena erro (caso ocorra ao buscar o sensor)
  const [erro, setErro] = useState(null);

  // Dados simulados para o gráfico
  const graficoData = [
    { name: '08:00', value: Math.floor(Math.random() * 100) },
    { name: '09:00', value: Math.floor(Math.random() * 100) },
    { name: '10:00', value: Math.floor(Math.random() * 100) },
    { name: '11:00', value: Math.floor(Math.random() * 100) },
    { name: '12:00', value: Math.floor(Math.random() * 100) },
  ];

  // Efeito que busca o sensor quando o componente é montado
  useEffect(() => {
    async function fetchSensor() {
      try {
        // Obtém o sensor da API
        const response = await getSensorPorId(id);
        setSensor(response); // Atualiza o estado com o sensor
      } catch (err) {
        // Exibe erro no console e armazena a mensagem
        console.error('Erro ao buscar sensor:', err);
        setErro('Erro ao buscar sensor');
      }
    }

    fetchSensor();
  }, [id]); // Executa o useEffect sempre que o id mudar

  // Enquanto há erro, retorna a mensagem
  if (erro) return <p>{erro}</p>;
  // Enquanto o sensor não foi carregado, retorna "Carregando..."
  if (!sensor) return <p>Carregando...</p>;

  return (
    <main className={styles.container}>
      {/* Título com o nome do sensor */}
      <h1>Gráficos do Sensor: {sensor.sensor}</h1>
      <div className={styles.graficos}>
        {/* Cada ChartCard recebe um tipo de gráfico e os mesmos dados */}
        <ChartCard title="Leituras do Sensor" type="line" data={graficoData} />
        <ChartCard title="Comparação por Horário" type="bar" data={graficoData} />
        <ChartCard title="Distribuição" type="pie" data={graficoData} />
      </div>
    </main>
  );
}
