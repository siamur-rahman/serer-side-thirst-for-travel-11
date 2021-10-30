
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');


;

// const ObjectId = require('mongodb').ObjectId;
const app = express();

//middlewere
app.use(cors());
app.use(express.json())

const port = 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wrybq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
   try {
      await client.connect();
      // console.log(`connetcted to db`);




      const database = client.db("tourists");
      const servicesCollection = database.collection("spots");



      //get api
      app.get('/services', async (req, res) => {
         const cursor = servicesCollection.find({});
         const users = await cursor.toArray();
         res.send(users);
      })

      //post apii
      app.post('/users', async (req, res) => {

         const newUser = req.body;
         const result = await servicesCollection.insertOne(newUser);
         console.log('got new user', req.body);
         console.log('added user', result);
         res.json(result);
      })

   } finally {
      //   await client.close();
   }
}
run().catch(console.dir);







app.get('/', (req, res) => {
   res.send('running thirst for travel crud server')
});

app.listen(port, () => {
   console.log('running server  with thirst for travel', port)
})