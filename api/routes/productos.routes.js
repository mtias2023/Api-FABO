import express from "express";
import * as controllers from "../controllers/productos.controlador.js"
import { validateProduct } from "../../middleware/producto.validate.middleware.js"; 
import { validateToken } from "../../middleware/token.middleware.js"

const route = express.Router()

route.get("/",[ validateToken ], controllers.getDeporte)
route.get("/deportes",[ validateToken ], controllers.getDeporte)
route.get("/deportes/:id",[ validateToken ], controllers.getDeporteId)
route.post("/deportes", [validateProduct, validateToken ], controllers.crearDeporte)
route.delete("/deporte/:id",[ validateToken ], controllers.borrarProducto)
route.put("/deporte/:id",[ validateToken ], controllers.reemplazarProducto)  

export default route