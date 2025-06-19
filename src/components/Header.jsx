import { useState } from 'react';
import styles from './Header.module.css'; 


export function Header() {
  return (
    // retorna o código html do header
    <header className={styles.header}>
      
            <div className={styles.footer_wave}></div>
    </header>
  );
}
