import { useState, useEffect } from 'react';

function App() {
  // CREACIÓN DE ESTADOS
  // Empezamos con un array vacío.
  const [productos, setProductos] = useState([]);
  
  // 'nombre' y 'precio' guardarán lo que el usuario escriba en las cajas de texto del formulario.
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');


  // Extraemos la URL de Render guardada en el archivo .env
  const API_URL = import.meta.env.VITE_API_URL;

  // FUNCIÓN PARA LLAMAR A LA API (GET)
  const pedirProductos = async () => {
    // Hacemos la petición web a la API
    const respuesta = await fetch(`${API_URL}/api/productos`);
    // Convertimos la respuesta cruda en un objeto JSON
    const datos = await respuesta.json();
    // Guardamos esos datos en el estado 'productos' para React
    setProductos(datos);
  };

  // EJECUCIÓN AUTOMÁTICA (useEffect)
  useEffect(() => {
    pedirProductos();
  }, []);

  // FUNCIÓN PARA ENVIAR EL FORMULARIO (POST)
  // Esta función se activa cuando el usuario pulsa el botón "Guardar"
  const guardarProducto = async (e) => {
  // Evitamos que la página web se recargue por completo al pulsar el botón
    e.preventDefault();

    // Enviamos los datos del nuevo producto hacia la API
    await fetch(`${API_URL}/api/productos`, {
      method: 'POST', // Especificamos que es una petición de envío
      headers: { 'Content-Type': 'application/json' }, // Decimos que enviamos texto tipo JSON
      body: JSON.stringify({ nombre, precio }) // Convertimos las variables en un texto JSON
    });

    // Limpiamos las cajas de texto del formulario para que queden vacías
    setNombre('');
    setPrecio('');

    // Volvemos a pedir los productos para que la lista se actualice en la pantalla
    pedirProductos();
  };

 
  return (
    <div>
      <h1>Listado de Productos</h1>

      {/* FORMULARIO PARA AÑADIR PRODUCTOS */}
      <form onSubmit={guardarProducto}>
        {/* Input para el Nombre. 'onChange' guarda lo que tecleas en la variable 'nombre' */}
        <input 
          type="text"