import styles from "./Historico.module.css";
import { useEffect, useState } from "react";
import { getFunctionHistorico } from "../services/API";

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

      {showAlert && (
        <div className={styles.alert}>
          🔔 Erro ao buscar os dados!
        </div>
      )}

      {dados.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <ul className={styles.lista}>
          {dados.map((item) => (
            <li key={item.id} className={styles.item}>
              <strong>Sensor:</strong> {item.sensor} <br />
              <strong>Ambiente:</strong> {item.ambiente} <br />
              <strong>Valor:</strong> {item.valor} <br />
              <strong>Timestamp:</strong> {item.timestamp} <br />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
