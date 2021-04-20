const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentaireRoutes = require('./routes/commentaire');
const likeRoutes = require('./routes/like');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/messages', messageRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/commentaire', commentaireRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;