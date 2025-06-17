import { useState } from 'react';
import styles from './Header.module.css'; // ou onde estiver seu CSS
import nuvem from '../assets/nuvem invertida.svg';  // caminho da imagem

export function Header() {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    console.log('Valor digitado:', e.target.value);
  };

  return (
    <header className={styles.header}>
      
            <div className={styles.footer_wave}></div>
    </header>
  );
}
