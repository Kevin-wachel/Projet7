const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { User } = require('../models');

// Inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hash
      };
      User.create(user)
      .then(user => {
        res.send({ user, message : "Utilisateur bien enregistré" });       
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur." });
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
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
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({ message: "Il y a un problème" });
    });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Utilisateur supprimé!" });
      } else {
        res.send({ message: `Impossible de supprimer id=${id}. ` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Impossible de supprimer l'utilisateur avec l'id=" + id });
    });
};
