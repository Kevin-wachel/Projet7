const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./config/connexiondb');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

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

module.exports = app;