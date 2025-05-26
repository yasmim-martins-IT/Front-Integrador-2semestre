import { Aside } from '../components/Aside'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import styles from './Initial.module.css'
export function Initial() {
    return (
        <div className= {styles.grid_container}  >
            <Header/>
            <Aside/>
            <Footer/>
        </div>
    )
}