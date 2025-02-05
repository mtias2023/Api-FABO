import * as servicios from "../../services/productos.service.js"

function getDeporte(req, res){
    const filtros = req.query
    servicios.getDeporte(filtros).then((deportes) => res.status(200).json(deportes))
}
function getDeporteId(req, res){
    const id = req.params.id
    servicios.getDeporteId(id)
        .then((deporte) => res.status(200).json(deporte))
}
function crearDeporte(req, res){
    const deporte = req.body
    servicios.agregarDeporte(deporte)
        .then( (deportes) => res.status(201).json(deportes) )
}
function borrarProducto(req, res){
    const id = req.params.id
    console.log("LLEGO EL BORRAR", req.params.id)
    servicios.borrarProducto(id)
        .then( () => res.status(204).json(id) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

function reemplazarProducto(req, res){
    const id = req.params.id
    const deporte = req.body
    servicios.modificarDeporte(id, deporte)
        .then( (deporte) => res.status(204).json(deporte) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

export { 
    getDeporte,
    getDeporteId,
    crearDeporte,
    borrarProducto,
    reemplazarProducto,
}