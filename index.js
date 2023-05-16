const express = require('express');

const app = express()

const port = process.env.PORT || 5000
// here is the midlewir
const cors = require("cors")

app.use(cors())

app.use(express.json())

require("dotenv").config()

// here is the starting use mongodb


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // databases name and collections

        const DB1 = client.db("studentsINFOContainer").collection("student")



        // here is the cursor of the server 

        app.get("/students", async (req, res) => {

            const cursor = DB1.find()

            const result = await cursor.toArray()
            res.send(result)

        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




// here is the starting use mongodb ends







// main server look res done
app.get("/", (req, res) => {

    res.send("server is running ")

})

// here is listeningn the server 

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})