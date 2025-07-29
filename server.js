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

// Get all users
app.get('/users', async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await db.collection('users').findOne({ _id: ObjectId(id) });
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
});

// Create a new user
app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await db.collection('users').insertOne(user);
    res.status(201).json(result.ops[0]);
});

// Update a user
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

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) res.json({ message: "User deleted" });
    else res.status(404).json({ error: "User not found" });
});

// Get all posts
app.get('/posts', async (req, res) => {
    const posts = await db.collection('posts').find().toArray();
    res.json(posts);
});

// Get a post by ID
app.get('/posts/:id', async (req, res) => {
    const post = await db.collection('posts').findOne({ _id: ObjectId(req.params.id) });
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
});

// Create a new post
app.post('/posts', async (req, res) => {
    const post = {
        ...req.body,
        userId: ObjectId(req.body.userId) // Ensure this is an ObjectId
    };
    const result = await db.collection('posts').insertOne(post);
    res.status(201).json(result.ops ? result.ops[0] : post);
});

// Update a post
app.put('/posts/:id', async (req, res) => {
    const result = await db.collection('posts').findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: req.body },
        { returnOriginal: false }
    );
    if (result.value) res.json(result.value);
    else res.status(404).json({ error: "Post not found" });
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    const result = await db.collection('posts').deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 1) res.json({ message: "Post deleted" });
    else res.status(404).json({ error: "Post not found" });
});

// Get all comments
app.get('/comments', async (req, res) => {
    const comments = await db.collection('comments').find().toArray();
    res.json(comments);
});

// Create a new comment
app.post('/comments', async (req, res) => {
    const comment = {
        ...req.body,
        userId: ObjectId(req.body.userId),   // Ensure this is an ObjectId
        postId: ObjectId(req.body.postId)    // Ensure this is an ObjectId
    };
    const result = await db.collection('comments').insertOne(comment);
    res.status(201).json(result.ops ? result.ops[0] : comment);
});

// Get all messages
app.get('/messages', async (req, res) => {
    const messages = await db.collection('messages').find().toArray();
    res.json(messages);
});

// Create a new message
app.post('/messages', async (req, res) => {
    const message = {
        ...req.body,
        fromUserId: ObjectId(req.body.fromUserId), // Ensure this is an ObjectId
        toUserId: ObjectId(req.body.toUserId)      // Ensure this is an ObjectId
    };
    const result = await db.collection('messages').insertOne(message);
    res.status(201).json(result.ops ? result.ops[0] : message);
});

// Get all posts by a user
app.get('/users/:id/posts', async (req, res) => {
    const userId = req.params.id;
    const posts = await db.collection('posts').find({ userId: ObjectId(userId) }).toArray();
    res.json(posts);
});

// Get all comments by a user
app.get('/users/:id/comments', async (req, res) => {
    const userId = req.params.id;
    const comments = await db.collection('comments').find({ userId: ObjectId(userId) }).toArray();
    res.json(comments);
});

// Get all comments for a post
app.get('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const comments = await db.collection('comments').find({ postId: ObjectId(postId) }).toArray();
    res.json(comments);
});

// Get all messages between two users
app.get('/messages/between/:user1/:user2', async (req, res) => {
    const user1 = ObjectId(req.params.user1);
    const user2 = ObjectId(req.params.user2);
    const messages = await db.collection('messages').find({
        $or: [
            { fromUserId: user1, toUserId: user2 },
            { fromUserId: user2, toUserId: user1 }
        ]
    }).toArray();
    res.json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));