import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@fabo-canchas.pocci.mongodb.net/";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        console.log("🔄 Usando conexión en caché");
        return { client: cachedClient, db: cachedDb };
    }

    console.log("🆕 Creando nueva conexión a MongoDB...");
    const client = await MongoClient.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = client.db("AH20232CP1");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
