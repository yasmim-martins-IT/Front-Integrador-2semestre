import { Aside } from '../components/Aside'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {Outlet} from 'react-router-dom'
import styles from './Initial.module.css'
export function Initial() {
    return (
              <div className={styles.grid_container}>
            <Header/>
            
            <Aside />
            
            <Outlet />
            
            <Footer />

        </div>
    )
}