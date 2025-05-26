import styles from './Header.module.css'
import React, { useState } from 'react';



export function Header () {
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
    setSearch(e.target.value);
    console.log('Valor digitado:', e.target.value); // só para testar no console
    };
    return(
    

    <header className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={handleInputChange}
        className={styles.input}
      />
    </header>

    ) ;
}