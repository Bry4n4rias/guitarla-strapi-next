import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../styles/blog.module.css';
import { formatearFecha } from '../../utils/helpers';

const Post = ({ post }) => {
  const { titulo, contenido, imagen, publishedAt } = post[0].attributes;
  return (
    <Layout
      title={'Blog'}
      description={'Blog de musica, venta de guitarras y mas'}
    >
      <article className={`${styles.post} ${styles['mt-3']}`}>
        <Image
          src={imagen.data.attributes.url}
          alt='Imagen blog'
          width={1000}
          height={600}
        />
        <div className={styles.contenido}>
          <h3>{titulo}</h3>
          <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
          <p className={styles.resumen}>{contenido}</p>
        </div>
      </article>
    </Layout>
  );
};

export default Post;

export async function getServerSideProps({ params }) {
  // asi leemos la propiedad url que viene en el objeto params
  // sea cuando le doy clic a una guitarrá en la tienda, me lleva a la url de esa guitarra, y esa url es la que viene como parametro
  // ahora hacemos el llamado a la api para consultar solo esa guitarra
  const { url } = params; // extraemos la url
  const respuesta = await fetch(
    `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`
  );
  const { data: post } = await respuesta.json();
  console.log(post);
  return {
    props: { post },
  };
}
