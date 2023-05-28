import * as dotenv from "dotenv"
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.ATLAS_CONNECTION_STRING;
const database = process.env.ATLAS_DATABASE;
const pdfCollection = process.env.ATLAS_PDF_COLLECTION;

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
const connect = async () => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
}


connect();

export default client;