import express from "express"
import * as controllers from "../controllers/usuarios.controller.js"
import { validateUsuario } from "../../middleware/usuario.validate.middleware.js"
import { validateToken } from "../../middleware/token.middleware.js"

const route = express.Router()

route.post( "/login", controllers.login )
route.get( "/usuarios",[validateToken], controllers.getUsuarios)       
route.post( "/usuarios/:idUsuario/carrito", [validateToken], controllers.agregarCarrito )
route.post("/usuarios", [validateUsuario], controllers.agregarUsuario);
route.delete( "/usuarios/:id", [validateToken], controllers.borrarUsuario )
export default route

