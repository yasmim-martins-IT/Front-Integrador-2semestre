import styles from "./Historico.module.css"

import { useEffect , useState } from "react" ; 
import {getFunctionHistorico} from "../services/API" ; 

export function Historico() {
    const [dados , setDados] = useState([]);
    const [loading , setLoading] = useState(true) ; 
    const [erro , setErro] = useState(null) ;
    const [showAlert, setShowAlert] = useState(false);

     const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Fecha após 2 segundos
  };


    useEffect(() => {
        async function  carregandoDados() {
            try {
                const resultado = await getFunctionHistorico();
                setDados(resultado);
            }catch (error) {
                  {showAlert && (
                    <div className="alert">
          🔔 Este é um alerta!
        </div>
      )}
            } finally {
                setLoading(false)
            }
            
        } ; 
        
    carregandoDados();
    }, [] )

      if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>{erro}</p>;

  return(
    <main>
        <h1>Bem vindo ao Historico</h1>

        <ul>
            {dados.map((item) => (
          <li key={item.id}>
            <strong>Sensor:</strong> {item.sensor} <br />
            <strong>Ambiente:</strong> {item.ambiente} <br />
            <strong>Valor:</strong> {item.valor} <br />
            <strong>Timestamp:</strong> {item.timestamp} <br />
            <strong>Data:</strong> {new Date(item.data).toLocaleString()}
          </li>
        ))}


        </ul>
    </main>
  )

}