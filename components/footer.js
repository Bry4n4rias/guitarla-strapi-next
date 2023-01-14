import Link from 'next/link';
import styles from '../styles/footer.module.css';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter(); // Para saber en que pagina estamos y poder aplicar estilos

  return (
    <footer className={styles.footer}>
      <div className={`contenedor ${styles.contenido}`}>
        <nav className={styles.navegacion}>
          <Link href='/'>Inicio</Link>
          <Link href='/nosotros'>Nosotros</Link>
          <Link href='/tienda'>Tienda</Link>
          <Link href='/blog'>Blog</Link>
        </nav>

        <p className={styles.copyrigth}>
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
