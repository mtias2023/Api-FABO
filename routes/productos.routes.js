import express from "express"
import * as controladores from "../controllers/productos.controlador.js"

const route = express.Router()

//Rutas
route.get("/", controladores.getDeporte)
route.get("/productos", controladores.getDeporte)
route.get("/productos/:id", controladores.getDeporteId)
route.get("/producto/nuevo", controladores.formDeporteNueva)
route.post( "/producto/nuevo", controladores.agregarDeporte )
route.get( "/producto/eliminar/:id", controladores.eliminarDeporte )
route.get( "/producto/modificar/:id", controladores.FormModificarDeporte )
route.post( "/producto/modificar/:id", controladores.modificarDeporte )

//Filtros
route.get("/categoria/:category", controladores.filtrarPorCategoria);
route.get("/location/:ubicacion", controladores.filtrarPorUbicacion);


export default route