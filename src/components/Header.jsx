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
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={handleInputChange}
          className={styles.input}
        />
        <i className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </i>
      </div>

      <div className={styles.containerImagem}>
        <img className={styles.nuvem} src={nuvem} alt="nuvem" />
      </div>
    </header>
  );
}
