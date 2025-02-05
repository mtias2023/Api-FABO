import { MongoClient } from "mongodb"

const cliente = new MongoClient("mongodb://localhost:27017")

cliente.connect()
    .then( () => console.log("Me conecte!") )
    .catch( () => console.log("No me pude conectar") )
const db = cliente.db("AH20232CP1")

async function consulta(){
    console.log("Consultado Datos")
    const datos = await db.collection("Deporte").find().toArray()
    console.log(datos)
}

consulta()


