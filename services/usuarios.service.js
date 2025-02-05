import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import { crearToken } from "./token.service.js";

const Client = new MongoClient("mongodb://localhost:27017")
const db = Client.db("AH20232CP1")

export async function getUsuarios(){
    await Client.connect();
    return db.collection("usuarios").find().toArray()
}

export async function agregarUsuario(usuario){
    await Client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if( existe ) {
        throw new Error("Esta cuenta ya existe")
    }    
    const usuarioNuevo = { ...usuario }   
    usuarioNuevo.password = await bcrypt.hash( usuario.password, 10)
    await db.collection("usuarios").insertOne(usuarioNuevo)
    return usuarioNuevo
}

export async function borrarUsuario(id){
    await Client.connect()
    return db.collection("usuarios").updateOne( {_id: ObjectId.createFromHexString(id)}, { $set: {eliminado: true} } )
}

export async function login(usuario){
    await Client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if( !existe ) {
        throw new Error(" No me pude loguear ")
    }
    const esValido = await bcrypt.compare( usuario.password, existe.password )
    if( !esValido ) {
        throw new Error(" No me pude loguear ")
    }
    const token = await crearToken(existe)
    return { ...existe,token: token, password: undefined }
}

export async function agregarCarrito(idUsuario, deporte){
    await Client.connect()
    const deporteCompleto = await db.collection( "Deporte" ).findOne({ _id: ObjectId.createFromHexString(deporte._id) })
    
    const resultado = await db.collection("usuarios").updateOne(
        { _id: ObjectId.createFromHexString(idUsuario) },
        { $push: {carrito: deporteCompleto} }
    )

    return resultado.modifiedCount > 0 ? "Deporte agregado" : "No se pudo agregar deporte "
}