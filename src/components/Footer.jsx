// Importa o React para que possamos usar componentes funcionais e JSX
import React from 'react';
// Importa o módulo CSS para estilização específica do componente
import styles from './Footer.module.css';
// Importa ícones das redes sociais e de contato da biblioteca react-icons/fa
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaInstagram, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Componente funcional Footer que retorna o rodapé da aplicação
export function Footer() {
  return (
    // Elemento <footer> principal com a classe CSS específica
    <footer className={styles.footer}> 
      <div className={styles.footer_content}> 
        {/* Informações de contato */}
        <div className={styles.footer_info}> 
          <h3>ENTRE EM CONTATO CONOSCO</h3>
          <p>
            {/* Ícone de localização */}
            <FaMapMarkerAlt />
            {/* Endereço da empresa */}
            Wisconsin Ave, Suite 700<br />
            Chevy Chase, Maryland 20815
          </p>
          <p>
            {/* Ícone de envelope */}
            <FaEnvelope />
            {/* Link que abre o cliente de e-mail para enviar mensagem */}
            <a href="mailto:support@SmartiCity.com">support@SmartiCity.com</a>
          </p>
        </div>

        {/* Área das redes sociais */}
        <div className={styles.footer_social}> 
          <h3>REDES SOCIAIS E CANAIS DE CONTATOS</h3>
          <div className={styles.icons}> 
            {/* Cada ícone dentro de uma tag <a> que pode apontar para o link da rede social */}
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTelegramPlane /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Div da eesttilização com uma onda no footer */}
      <div className={styles.footer_wave}></div>
    </footer>
  )
};
