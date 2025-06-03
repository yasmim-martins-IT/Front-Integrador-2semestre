import styles from './Aside.module.css';
import logo from '../assets/Logo.png'
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { RiHomeLine } from "react-icons/ri";
import { ImDroplet } from "react-icons/im";
import {Link} from 'react-router-dom' ; 
import { BsLightbulb } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import nuvem from '../assets/nuvem.svg'
export function Aside(){
    return(
        <aside className={styles.container}>
           <header>
                <div className= {styles.containerUsuario}>
                    <img className={styles.fotoUsuario} 
                    src={logo}/>
                </div>

           </header>
           <section className={styles.containerBotoes}>
             <div className={styles.links_container}>

                    <div className={styles.container_icons}>
                        <ImDroplet className={styles.icone} size={30} />
                        <FaTemperatureHalf className={styles.icone} size={30} />
                        <RiHomeLine className={styles.icone} size={30} />
                        <BsLightbulb className={styles.icone} size={30} />
                        <CgNotes className={styles.icone} size={31} />
                    </div>

                    <div className={styles.container_links}>
                        <Link className={styles.botao} to={'/umidade'}>
                            Umidade
                        </Link>
                        <Link className={styles.botao} to={'/iluminacao'}>Iluminação</Link>
                        <Link className={styles.botao} to={'/temperatura'}>Temperatura</Link>
                        <Link className={styles.botao} to={'/ambientes'}>Ambientes</Link>
                        <Link className={styles.botao} to={'historico'}>Histórico</Link>
                    </div>

                </div>
                
           </section>
           <div className={styles.containerImagem}><img className={styles.nuvem} src={nuvem} alt="nuvem" height={250} width={200} /></div>
           
        </aside>
    )
};