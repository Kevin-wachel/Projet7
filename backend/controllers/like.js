const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Like } = require('../models');

// Ajout/suppression d'un like ou un dislike à une sauce
exports.addLikeDislike = (req, res, next) => {

};