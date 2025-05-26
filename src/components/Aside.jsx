import styles from './Aside.module.css'
import logo from "../assets/Logo.jpg"
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { HiAcademicCap } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import {Link} from 'react-router' ; 

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
                <Link className={styles.botao} to = {'professor'}>
                    <FaChalkboardTeacher className={styles.icone} size={30} />
                    Professor</Link>
                <Link className={styles.botao} to = {'disciplinas'}><GoBook className={styles.icone} size={25}  />Disciplinas</Link>
                <Link className={styles.botao} to = {'sala'}><HiAcademicCap className={styles.icone} size={30} />Ambientes</Link>
                <Link className={styles.botao} to = {'/initial'}><FaTasks className={styles.icone} size={25} /> Reservar</Link>
           </section>
        </aside>
    )
};