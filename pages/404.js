import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout';

const Pagina404 = () => {
  return (
    <Layout title={'404'} description={'Pagina no encontrada'}>
      <p className='error'>Pagina no encontrada</p>
      <Link className='error-enlace' href='/'>
        Volver a inicio
      </Link>
    </Layout>
  );
};

export default Pagina404;
