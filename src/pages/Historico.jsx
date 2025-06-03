import styles from "./Historico.module.css";
import { useEffect, useState } from "react";
import { getFunctionHistorico } from "../services/API";
import { ChartCard } from "../components/Cards";

export function Historico() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Fecha após 2 segundos
  };

  useEffect(() => {
    async function carregandoDados() {
      try {
        const resultado = await getFunctionHistorico();
        if (Array.isArray(resultado)) {
          setDados(resultado);
        } else {
          throw new Error('Os dados recebidos não são uma lista');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErro('Erro ao carregar dados');
        handleShowAlert();
      } finally {
        setLoading(false);
      }
    }

    carregandoDados();
  }, []);

  if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <main className={styles.container}>
      <h1>Bem vindo ao Histórico</h1>
      {dados.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.infos}>
        <ul className={styles.lista}>
          {dados.map((item) => (
            <li key={item.id} className={styles.item}>
              <strong className={styles.texto}>Sensor:</strong> {item.sensor} <br />
              <strong className={styles.texto}>Ambiente:</strong> {item.ambiente} <br />
              <strong className={styles.texto}>Valor:</strong> {item.valor} <br />
              <strong className={styles.texto}>Timestamp:</strong> {item.timestamp} <br />
            </li>
          ))}
        </ul>
        <div className={styles.graficos}>
          <ChartCard title="Tempo ativo em horas" type="pie" />     
        </div>
        <div className={styles.graficos}>
          <ChartCard title="Tempo ativo em horas" type="bar" />     
        </div>
             
        </div>
     
      )}
        <div id={styles.graficoLine}>
          <ChartCard title="Tempo ativo em horas" type="line" />     
        </div>
         
    </main>
  );
}
