import { useState , useEffect } from 'react'
import styles from './Ambientes.module.css'
import { getAdapter } from 'axios'
import { getAmbientes } from '../services/API'
import { useNavigate } from 'react-router-dom' ;

export function Ambientes() {
    const [ambientes , setAmbientes] = useState ([])
    const [loading , setLoading] = useState(true)
    const [erro , setErro] = useState(null)
    const navigate = useNavigate();

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
    function irParaCadastro() {
    navigate('/initial/cadastroAmbientes');
    }
  


  return(
     <main className={styles.container}>
          <h1>AMBIENTES</h1>
            <button onClick={irParaCadastro} className={styles.botao_cadastro}>
                  Cadastrar Novo Ambiente
                </button>
    
          {ambientes.length === 0 ? (
            <p>Nenhum dado encontrado.</p>
          ) : (
            <div className={styles.grid}>
              {ambientes.map((item) => (
                <div key={item.id} className={styles.card}>
                  <h2>{item.sensor}</h2>
                  <h2><strong>Sig:</strong> {item.sig}</h2>
                  <p><strong>Descrição:</strong> {item.descricao}</p>
                  <p><strong>Ni:</strong> {item.ni}</p>
                  <p><strong>Responsavel:</strong> {item.responsavel}</p>
                </div>
              ))}
            </div>
          )}
    

        </main>
  )

}