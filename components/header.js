import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter(); // Para saber en que pagina estamos y poder aplicar estilos

  return (
    <header className={styles.header}>
      <div className={`contenedor ${styles.barra}`}>
        <Link href='/'>
          <Image
            src='/img/logo.svg'
            width={300}
            height={40}
            alt='Imagen logotipo'
          />
        </Link>

        <nav className={styles.navegacion}>
          <Link
            className={router.pathname === '/' ? styles.enlaceActivo : ''}
            href='/'
          >
            Inicio
          </Link>
          <Link
            className={
              router.pathname === '/nosotros' ? styles.enlaceActivo : ''
            }
            href='/nosotros'
          >
            Nosotros
          </Link>
          <Link
            className={router.pathname === '/tienda' ? styles.enlaceActivo : ''}
            href='/tienda'
          >
            Tienda
          </Link>
          <Link
            className={router.pathname === '/blog' ? styles.enlaceActivo : ''}
            href='/blog'
          >
            Blog
          </Link>

          <Link href='/carrito'>
            <Image
              src='/img/carrito.png'
              width={30}
              height={30}
              alt='Carrito'
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
