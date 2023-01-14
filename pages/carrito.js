import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '../components/layout';
import styles from '../styles/carrito.module.css';

const Carrito = ({ carrito, actualizarCantidad, eliminarProducto }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // calcular el total del carrito de compras con reduce y map
    const total = carrito.reduce((acc, item) => {
      // acc = acumulador (0) y item = cada item del carrito (guitarra)
      return acc + item.precio * item.cantidad; //
    }, 0);
    setTotal(total);
  }, [carrito]);

  return (
    <Layout
      title={'Carrito'}
      description={'Blog de musica, venta de guitarras y mas'}
    >
      <main className='contenedor'>
        <h1 className='heading'>Carrito</h1>
        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h2>Articulos</h2>
            {carrito.length === 0
              ? 'Carrito vacio'
              : carrito.map((guitarra) => (
                  <div className={styles.producto} key={guitarra.id}>
                    <div>
                      <Image
                        src={guitarra.imagen}
                        width={250}
                        height={480}
                        alt={guitarra.nombre}
                      />
                    </div>
                    <div>
                      <p className={styles.nombre}>{guitarra.nombre}</p>
                      <div className={styles.cantidad}>
                        <p>Cantidad</p>
                        <select
                          value={guitarra.cantidad}
                          className={styles.select}
                          onChange={(e) =>
                            actualizarCantidad({
                              id: guitarra.id,
                              cantidad: Number(e.target.value),
                            })
                          }
                        >
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>
                      </div>
                      <p className={styles.precio}>
                        $ <span>{guitarra.precio}</span>
                      </p>
                      <p className={styles.subtotal}>
                        <span>
                          Subtotal: {''}
                          {guitarra.cantidad * guitarra.precio}
                        </span>
                      </p>
                    </div>
                    <button
                      className={styles.eliminar}
                      type='button'
                      onClick={() => eliminarProducto(guitarra.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
          </div>

          <aside className={styles.resumen}>
            <h3>Resumen del pedido</h3>
            <p>Total a pagar: $ {total}</p>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Carrito;
