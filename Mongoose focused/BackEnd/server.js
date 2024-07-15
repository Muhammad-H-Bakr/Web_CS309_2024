const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a simple schema and model
const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

// API endpoints
app.get('/api/items', async (req, res) => {
    const items = await Item.find(undefined, undefined, undefined);
    res.send(items);
});

app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.send(newItem);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
