import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaInstagram, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
export function Footer(){
    return(
       <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_info}>
          <h3>ENTRE EM CONTATO CONOSCO</h3>
          <p>
            <FaMapMarkerAlt />
            Wisconsin Ave, Suite 700<br />
            Chevy Chase, Maryland 20815
          </p>
          <p>
            <FaEnvelope />
            <a href="mailto:support@SmartiCity.com">support@SmartiCity.com</a>
          </p>
        </div>

        <div className={styles.footer_social}>
          <h3>REDES SOCIAIS E CANAIS DE CONTATOS</h3>
          <div className={styles.icons}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTelegramPlane /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className={styles.footer_wave}></div>
    </footer>
    )
};