import Curso from '../components/curso';
import Guitarra from '../components/guitarra';
import Layout from '../components/layout';
import Post from '../components/post';
import styles from '../styles/grid.module.css';

export default function Home({ posts, guitarras, curso }) {
  return (
    <>
      <Layout
        title={'Inicio'}
        description={'Blog de musica, venta de guitarras y mas'}
      >
        <main className='contenedor'>
          <h1 className='heading'>Nuestra coleccion</h1>
          <div className={styles.grid}>
            {guitarras.map((guitarra) => (
              <Guitarra key={guitarra.id} guitarra={guitarra.attributes} />
            ))}
          </div>
        </main>

        <Curso curso={curso.attributes} />

        <section className='contenedor'>
          <h2 className='heading'>Ultimos blogs</h2>
          <div className={styles.grid}>
            {posts.map((post) => (
              <Post key={post.id} post={post.attributes} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // como tengo que eseprar las dos respeustas de la api para poder extraer la data de cada una de ellas y poder renderizarlas en el componente debo usar Promise.all
  // y le paso un arreglo de promesas que quiero que se ejecuten al mismo tiempo y cuando se ejecuten todas las promesas que le pase al Promise.all
  // se ejecutara la siguiente linea de codigo que es la que extrae la data de cada una de las promesas que se ejecutaron anteriormente
  const urlGuitarras = `${process.env.API_URL}/guitarras?populate=imagen`;
  const urlPosts = `${process.env.API_URL}/posts?populate=imagen`;
  const urlCurso = `${process.env.API_URL}/curso?populate=imagen`;

  const [respuestaGuitarras, respuestaPosts, respuestaCurso] =
    await Promise.all([fetch(urlGuitarras), fetch(urlPosts), fetch(urlCurso)]); // aqui le paso un arreglo de promesas

  const [{ data: guitarras }, { data: posts }, { data: curso }] =
    await Promise.all([
      respuestaGuitarras.json(),
      respuestaPosts.json(),
      respuestaCurso.json(),
    ]); // cuando se ejecuten todas las promesas anteriores se ejecutara esta linea de codigo y se extraera la data de cada una de las promesas
  // y se guardara en un arreglo de objetos con la data de cada una de las promesas que se ejecutaron anteriormente

  return {
    props: {
      guitarras,
      posts,
      curso,
    },
  };
}
