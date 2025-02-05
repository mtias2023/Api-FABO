import { MongoClient, ObjectId } from "mongodb"

const Client = new MongoClient("mongodb://localhost:27017")
const db = Client.db("AH20232CP1")

async function getDeporte(filtros = {}) {
    try {
        await Client.connect();
        const filterMongo = { filtroEliminado: { $ne: true } };

        if (filtros.category) {
            filterMongo.category = { $eq: filtros.category };
        }

        if (filtros.location) {
            filterMongo.location = { $eq: filtros.location };
        }

        return db.collection("Deporte").find(filterMongo).toArray();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw error;
    }
}

async function getDeporteId(id_ingresado){
    await Client.connect()
    return db.collection("Deporte").findOne({ _id: new ObjectId(id_ingresado)})
}

async function getCategoriasUnicas() {
    await Client.connect();
    return db.collection("Deporte").distinct("category");  
}

async function getUbicacionesUnicos() {
    await Client.connect();
    return db.collection("Deporte").distinct("location");
}

async function borrarProducto(id){
    await Client.connect()
    return db.collection("Deporte").deleteOne({ _id: new ObjectId(id) })
}

async function agregarDeporte(deportes){
    await Client.connect()
    await db.collection("Deporte").insertOne(deportes)
    return deportes
}

async function modificarDeporte(id, deporteActualizada) {
    await Client.connect();
    return db.collection("Deporte").replaceOne({ _id: new ObjectId(id) }, deporteActualizada);
}

//Exports
export{
    getDeporte, 
    getDeporteId, 
    agregarDeporte, 
    getUbicacionesUnicos, 
    getCategoriasUnicas,
    modificarDeporte,
    borrarProducto
}

