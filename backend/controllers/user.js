const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user') (sequelize, DataTypes);

// Inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({ 
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      sequelize.query(`INSERT INTO users(username, email, password) VALUES('${user.username}','${user.email}','${user.password}')`)
        .then(() => res.status(201).json({ message: 'Votre compte à bien été créer !' }))
        .catch(error => res.status(400).json({ error }));
    })
  .catch(error => res.status(500).json({ message : "Il y a un problème" }));
};

// Connexion
exports.login = (req, res, next) => {
  db.User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ error });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Tout les utilisateurs
exports.getAllUsers = (req, res, next) => {
  sequelize.query(`SELECT id, username, isAdmin, bio, email FROM users`)
  .then(() => res.status(200).json({ results }))
  .catch(error => res.status(400).json({ error }));
};

// Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  sequelize.query(`DELETE FROM users WHERE id ='${req.params.id}' `)
  .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};
