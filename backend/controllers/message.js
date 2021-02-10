const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Message } = require('../models');
const { User } = require('../models');

// Création d'un message
exports.createMessage = (req, res, next) => {
  const message = {
    UserId: req.body.UserId,
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
  Message.findAll({
    include: [{
      model: User
    }]
  })
    .then((message) => {
      res.send(message);
    })
    .catch(err => {
      res.status(500).send({ message: "Il y a un problème" });
    });
};

// Supprimer les messages
exports.deleteMessage = (req, res, next) => {
  const id = req.params.id;
  Message.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Message supprimé!" });
      } else {
        res.send({ message: `Impossible de supprimer id=${id}. ` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Impossible de supprimer le message avec l'id=" + id });
    });
};

// Ajout/suppression d'un like ou un dislike à une sauce
exports.addLikeDislike = (req, res, next) => {

};
