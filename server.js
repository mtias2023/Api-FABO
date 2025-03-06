// Imports
import express from "express";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';

// Rutas
import RutasProductos from "./routes/productos.routes.js";
import ApiRoute from "./api/routes/productos.routes.js";
import ApiUsuario from "./api/routes/usuarios.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT"
};

// Middlewares
app.use('/img', express.static(path.join(__dirname, 'img')));  // Acceso público a imágenes
app.use(express.urlencoded({ extended: true }));  // Para procesar datos del formulario
app.use(express.json());  // Para procesar solicitudes JSON
app.use(cors(corsOptions));  // Habilitar CORS con la configuración especificada

// Rutas
app.use(RutasProductos);  // Ruta de productos
app.use("/api", ApiRoute);  // API de productos
app.use("/api", ApiUsuario);  // API de usuarios

// Inicialización del servidor
export default app;
