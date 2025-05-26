import styles from './Aside.module.css'
import Logo from '../assets/Logo.png'

export function Aside(){
    return  (<aside className={styles.container}>
                
                <img src={Logo} alt="Logo" />
        
            </aside>)
}