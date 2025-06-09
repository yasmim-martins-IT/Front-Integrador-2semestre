import { useState , useEffect } from 'react'
import styles from './Ambientes.module.css'
import { getAdapter } from 'axios'
import { getAmbientes } from '../services/API'

export function Ambientes() {
    const [ambientes , setAmbientes] = useState ([])
    const [loading , setLoading] = useState(true)
    const [erro , setErro] = useState(null)

     useEffect(() => {
        async function fetchData() {
          try {
            const response = await getAmbientes();
            setAmbientes(response || []);
          } catch (error) {
            console.error("Erro ao buscar ambientes", error);
            setErro(error);
          } finally {
            setLoading(false);
          }
        }
        
    fetchData();
  }, []);


  return(
     <main className={styles.container}>
          <h1>Visualizador de Sensores de Luminosidade</h1>
    
          {ambientes.length === 0 ? (
            <p>Nenhum dado encontrado.</p>
          ) : (
            <div className={styles.grid}>
              {ambientes.map((item) => (
                <div key={item.id} className={styles.card}>
                  <h2>{item.sensor}</h2>
                  <p><strong>Sig:</strong> {item.sig}</p>
                  <p><strong>Descrição:</strong> {item.ni}</p>
                  <p><strong>Ni:</strong> {item.longitude}</p>
                  <p><strong>Responsavel:</strong> {item.responsavel}</p>

                </div>
              ))}
            </div>
          )}
    

        </main>
  )

}