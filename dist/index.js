"use strict";
const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root1:passwordroot@cluster0.j4cyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const data = require("./posts");
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const PORT = normalizePort(process.env.PORT || 5000);
const router = express.Router();
app.use(express.json());
let posts = [];
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('content-type', 'application/json');
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/posts", (req, res) => {
    const data_posts = [...posts, ...data];
    res.send(data_posts);
});
app.post("/posts/create", (req, res) => {
    posts = [...posts, ...data, ...req.body];
    res.send("new post successfully added");
});
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
