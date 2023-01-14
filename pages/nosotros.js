import Image from 'next/image';
import Layout from '../components/layout';
import styles from '../styles/nosotros.module.css';

const Nosotros = () => {
  return (
    <>
      <Layout
        title={'Nosotros'}
        description={'Blog de musica, venta de guitarras y mas'}
      >
        <main className='contenedor'>
          <h1 className='heading'>Nosotros</h1>

          <div className={styles.contenido}>
            <Image
              src='/img/nosotros.jpg'
              alt='Imagen sobre nosotros'
              width={1000}
              height={800}
            />
            <div>
              <p>
                lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                corporis, quibusdam quae, ipsam voluptatibus, natus quas
                voluptates quisquam voluptatem atque quidem. Doloremque nemo
                voluptatem, quae, quidem voluptates obcaecati, harum iure
                voluptate, quas repudiandae voluptatibus itaque. Quod porro
                voluptates, ex, eligendi ipsam tempore, voluptate voluptas
                voluptatem aperiam modi sequi quo dolores. Rerum, doloribus
                perspiciatis.
              </p>

              <p>
                lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                corporis, quibusdam quae, ipsam voluptatibus, natus quas
                voluptates quisquam voluptatem atque quidem. Doloremque nemo
                voluptatem, quae, quidem voluptates obcaecati, harum iure
                voluptate.
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Nosotros;
