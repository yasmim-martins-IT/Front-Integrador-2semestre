import styles from './Home.module.css'
import {ChartCard} from '../components/Cards'

export function Home () {
    return(
        <div>
            <main>
                <h1 className={styles.titulo}>SEJA BEM-VINDO A SMARTCITY</h1>
                <h2>O futuro começa agora</h2>
                <div className={styles.borda}>
                <section className={styles.conteudo} >
                    <p className={styles.texto}>Através de uma visualização clara e intuitiva, você pode acompanhar os níveis atuais de cada parâmetro, identificar tendências, detectar variações fora dos padrões esperados e tomar decisões proativas para manter o conforto e a segurança dos espaços monitorados</p>
                    <ChartCard className = {styles.graficos} title="ficticio" type="bar" />          
                </section>

                <section className = {styles.conteudo}>
                     <ChartCard className = {styles.graficos} title="ficticio" type="pie" />         
                    <p className={styles.texto}>Ideal para ambientes como salas de aula, laboratórios, escritórios ou qualquer espaço que exija controle ambiental inteligente, esta página integra tecnologia e usabilidade para facilitar a tomada de decisões com base em dados confiáveis.</p>
                </section>
                  <section className={styles.conteudo} >
                    <p className={styles.texto}>Falou gerenciamento de ambientes de forma eficiente falou da Smartcity!</p>
                    <ChartCard  title="ficticio" type="line" />          
                    </section>
            </div>
            </main>
        </div>
    )
}