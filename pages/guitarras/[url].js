import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from '../../styles/guitarras.module.css';
import { useState } from 'react';

const Producto = ({ guitarra, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0);
  const { nombre, descripcion, precio, imagen } = guitarra[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert('Seleccione una cantidad');
      return;
    }

    // creamos el objeto que vamos a guardar en el carrito
    const guitarraSeleccionada = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };

    // pasamos la informacion al context del carrito
    agregarCarrito(guitarraSeleccionada);
  };

  return (
    <Layout title={`Guitarra ${nombre}`} description='Descripcion de guitarra'>
      <div className={styles.guitarra}>
        <Image
          src={imagen.data.attributes.formats.medium.url}
          alt='Imagen guitarra'
          width={300}
          height={300}
        />

        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>{precio}</p>

          <form onSubmit={handleSubmit} className={styles.formulario}>
            <label htmlFor='cantidad'>Cantidad: </label>
            <select
              onChange={(e) => setCantidad(Number(e.target.value))}
              id='cantidad'
            >
              <option value='0'>-- Seleccione --</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>

            <input type='submit' value='Agregar al carrito' />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Producto;

// ------ FORMA STATIC ------- //

// ------ SI SE HACE DE ESTA FORMA HAY Q USAR LOS STATICS PATHS ------- //
export async function getStaticProps({ params }) {
  // asi leemos la propiedad url que viene en el objeto params
  // sea cuando le doy clic a una guitarrá en la tienda, me lleva a la url de esa guitarra, y esa url es la que viene como parametro
  // ahora hacemos el llamado a la api para consultar solo esa guitarra
  const { url } = params; // extraemos la url
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
  );
  const { data: guitarra } = await respuesta.json();
  return {
    props: { guitarra },
  };
}

// con esta funcion devolvemos todas las url para que next pueda generar las paginas de cada una de las guitarras que tenemos en la tienda
// de forma estatica osea una vez que se generan las paginas, ya no se vuelven a generar de nuevo cuando se haga un llamado a la api para obtener las guitarras
// si hay un cambio en la api, no van a haber cambios hasta que no se haga el build de nuevo
export async function getStaticPaths() {
  // aqui obtenemos las urls de las guitarras
  const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
  const { data: guitarras } = await respuesta.json();

  // aqui mapeamos las urls de las guitarras para que next pueda generar las paginas de cada una de las guitarras
  const paths = guitarras.map((guitarra) => ({
    // params es un objeto que tiene la propiedad url, y esa propiedad url es la que se va a usar para generar la pagina de cada una de las guitarras
    params: { url: guitarra.attributes.url },
    // params: { url: 'Beck' }, // asi se veria el objeto params
  }));

  // en resumen con esta funcion next genera cada una de las paginas de ofrma estatica para q se le muestre a los clientes,
  // si son muchisimas paginas se usa el incremental static regeneration para que no se vuelva a generar cada una de las paginas
  // si no que solo se generen las paginas que se necesiten

  return {
    paths, // aqui le pasamos las urls de las guitarras
    fallback: false,
    // fallback: false, // si no se encuentra la url, no se va a generar la pagina, y va a mostrar un error 404
  };
}

// ------ FORMA SIDE RENDERING ------- //
// export async function getServerSideProps({ params }) {
//   // asi leemos la propiedad url que viene en el objeto params
//   // sea cuando le doy clic a una guitarrá en la tienda, me lleva a la url de esa guitarra, y esa url es la que viene como parametro
//   // ahora hacemos el llamado a la api para consultar solo esa guitarra
//   const { url } = params; // extraemos la url
//   const respuesta = await fetch(
//     `${process.env.API_URL}/guitarras?filters[url]=beck&populate=imagen`
//   );
//   const { data: guitarra } = await respuesta.json();
//   return {
//     props: { guitarra },
//   };
// }
