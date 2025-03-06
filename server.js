import express from "express";
import { connectToDatabase } from "./db.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Rutas
import RutasProductos from "./routes/productos.routes.js";
import ApiRoute from "./api/routes/productos.routes.js";
import ApiUsuario from "./api/routes/usuarios.routes.js";

const app = express();

// Manejo de rutas en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: "*",  // Asegúrate de permitir todas las conexiones en producción
    methods: "GET, POST, DELETE, PUT"
};

// Middlewares
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// ✅ Mueve esta ruta después de los middlewares
app.use(RutasProductos);
app.use("/api", ApiRoute);
app.use("/api", ApiUsuario);

// ✅ Ruta para consultar deportes
app.get("/api/deportes", async (req, res) => {
    try {
        console.log("📡 Consultando datos...");
        const { db } = await connectToDatabase();
        const deportes = await db.collection("Deporte").find().toArray();

        res.json(deportes);
    } catch (error) {
        console.error("❌ Error en la consulta:", error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// ⚠️ Importante: No uses `app.listen()` en Vercel
export default app;
