import { useEffect, useState } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const carritoLS =
    // Comprobar si estamos en el navegador para que no de error al hacer el build de next
    // osea si estamos en el navegador es por que el cliente lo esta ejecutando y si no estamos en el navegador es por que el servidor lo esta ejecutando
    // y si el servidor lo esta ejecutando no hay local storage por que el servidor no tiene un navegador para guardar el local storage
    typeof window !== 'undefined'
      ? // Si hay algo en el local storage, lo parseamos a JSON y lo asignamos a carritoLS sino asignamos un array vacio
        JSON.parse(localStorage.getItem('carrito')) ?? []
      : //  ?? es un operador de cortocircuito, si el valor de la izquierda es null o undefined, devuelve el valor de la derecha
        // ahora hacemos otra comprobacion, si no hay nada en el LS le asignamos o array vacio
        // en resumen primero comprobamos si estamos en el navegador, si estamos en el navegador comprobamos si hay algo en el LS,
        // si hay algo en el LS lo parseamos a JSON y lo asignamos a carritoLS sino asignamos un array vacio
        [];
  const [carrito, setCarrito] = useState(carritoLS);
  const [paginaLista, setPaginaLista] = useState(false);
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // esperamos a que se monte el componente para asignar true a paginaLista
  // esto se hace para que next no nos de error de hidratacion
  useEffect(() => {
    setPaginaLista(true);
  }, []);

  const agregarCarrito = (guitarra) => {
    // Comprobar si la guitarra ya esta en el carrito...
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar para actualizar la cantidad
      const carritoActualizado = carrito.map((guitarraState) => {
        // Si la guitarra ya esta en el carrito, se actualiza la cantidad
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      // Se asigna al array
      setCarrito([...carritoActualizado]);
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      // En caso de que el articulo no exista, es nuevo y se agrega
      setCarrito([...carrito, guitarra]);
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  };
  // Eliminar producto del carrito por id del producto
  const eliminarProducto = (id) => {
    // Filtrar el array para eliminar el producto por id
    const carritoActualizado = carrito.filter(
      (producto) => producto.id != id // me devuelve un array con todos los productos que no sean el que le estoy pasando por parametro
    );
    setCarrito(carritoActualizado);
    // window.localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  // Actualizar la cantidad de productos en el carrito
  const actualizarCantidad = (guitarra) => {
    // guitarra es un objeto que tiene id y cantidad por eso
    // viene asi desde carrito.js actualizarCantidad({ id: guitarra.id, cantidad: Number(e.target.value), })
    // Iterar para actualizar la cantidad de productos en el carrito
    const carritoActualizado = carrito.map((guitarraState) => {
      // Si la guitarra ya esta en el carrito, se actualiza la cantidad de productos
      if (guitarraState.id === guitarra.id) {
        // Se actualiza la cantidad de productos en el carrito
        guitarraState.cantidad = parseInt(guitarra.cantidad);
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
    window.localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  return (
    // Si paginaLista es true, renderizamos el componente, sino renderizamos null
    paginaLista && (
      <Component
        {...pageProps}
        agregarCarrito={agregarCarrito}
        carrito={carrito}
        eliminarProducto={eliminarProducto}
        actualizarCantidad={actualizarCantidad}
      />
    )
  );
}
