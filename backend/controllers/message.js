const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Message } = require('../models');
const { User } = require('../models');

// Création d'un message
exports.createMessage = (req, res, next) => {
  const message = {
    userId: req.body.userId,
    content: req.body.content,
    attachment: req.body.attachment
    };
    Message.create(message)
    .then(message => {
      res.send({ message });     
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Une erreur s'est produite lors de la création du message." });
    });
};

// Voir tout les messages
exports.getAllMessages = (req, res, next) => {
  Message.findAll()
    .then((message) => {
      res.send(message);
    })
    .catch(err => {
      res.status(500).send({ message: "Il y a un problème" });
    });
};

// Supprimer les messages
exports.deleteMessage = (req, res, next) => {
   Message.deleteOne({ id: req.params.id })
   .then(() => res.status(200).json({ message: 'Message supprimé !'}))
   .catch(error => res.status(400).json({ error }));
};
