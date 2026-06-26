import express from 'express';
import cors from 'cors';

const app = express();

// Permitir peticiones desde cualquier origen (como Netlify)
app.use(cors());

// Permitir que el servidor entienda datos en formato JSON
app.use(express.json());

// Listado de productos en memoria para el examen
let productos = [
    { id: 1, nombre: "Teclado Mecánico", precio: 59.99 },
    { id: 2, nombre: "Ratón Gaming", precio: 29.99 }
];

// Ruta para obtener los productos (GET)
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Ruta para añadir un producto (POST)
app.post('/api/productos', (req, res) => {
    const { nombre, precio } = req.body;

    const nuevoProducto = {
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        nombre: nombre,
        precio: Number(precio)
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Configurar el puerto automático o usar el 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});