const express = require('express');
const bodyParse = require("body-parser");
const cors = require('cors')
const app = express();
require('dotenv').config()
const port = 3000;

app.use(bodyParse.json());
app.use(cors())

const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassKipper';


app.get("/", async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
});

app.post("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.findOneAndDelete({ id });
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
    console.log(`listing on port ${port}`)
})