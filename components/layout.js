import Head from 'next/head';
import Footer from './footer';
import Header from './header';
const Layout = ({ children, title = '', description = '' }) => {
  return (
    <>
      <Head>
        <title>{`GutarLA - ${title}`}</title>
        <meta name='description' content={description} />
      </Head>

      <Header />
      {/* children es el contenido que se mostrara cuando un componente sea envuelto sobre la etiqueta Layout */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
