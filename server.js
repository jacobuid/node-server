require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
client.connect()
  .then(() => {
    db = client.db('db-node-server'); // This database will be created automatically
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
    process.exit(1);
  });

// Example: Get all users
app.get('/users', async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.json(users);
});

// Example: Get user by id
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await db.collection('users').findOne({ _id: ObjectId(id) });
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
});

// Example: Create a user
app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await db.collection('users').insertOne(user);
    res.status(201).json(result.ops[0]);
});

// Example: Update a user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const result = await db.collection('users').findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: user },
        { returnOriginal: false }
    );
    if (result.value) res.json(result.value);
    else res.status(404).json({ error: "User not found" });
});

// Example: Delete a user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) res.json({ message: "User deleted" });
    else res.status(404).json({ error: "User not found" });
});

// Add similar endpoints for posts, comments, messages

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));