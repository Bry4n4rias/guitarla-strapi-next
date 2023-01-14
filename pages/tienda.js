import Layout from '../components/layout';
import Guitarra from '../components/guitarra';
import styles from '../styles/grid.module.css';

// ------ FORMA STATIC ------- //
// PRIMERO SE EJECUTA ESTA FUCION QUE ES LA Q OBTIENE LOS DATOS DE LA API
// funcion para hacer el fetch de las guitarras en el servidor de next
// export async function getStaticProps() {
//   const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
//   const { data: guitarras } = await respuesta.json();
//   console.log(guitarras);

//   return {
//     // retorno las guitarras mediante props para que se rendericen en el componente
//     props: {
//       guitarras,
//     },
//   };
// }

// ------ FORMA SIDE REDERING ------- //
// PRIMERO SE EJECUTA ESTA FUCION QUE ES LA Q OBTIENE LOS DATOS DE LA API
export async function getServerSideProps() {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`
  );
  const { data: guitarras } = await respuesta.json();

  return {
    // retorno las guitarras mediante props para que se rendericen en el componente
    props: {
      guitarras,
    },
  };
}

// LUEGO SE EJECUTA EL COMPONENTE
const Tienda = ({ guitarras }) => {
  return (
    <>
      <Layout title={'Tienda'} description={'Tienda de guitarras'}>
        <main className='contenedor'>
          <h1 className='heading'>Nuestra coleccion</h1>

          <div className={styles.grid}>
            {guitarras.map((guitarra) => (
              <Guitarra key={guitarra.id} guitarra={guitarra.attributes} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Tienda;
