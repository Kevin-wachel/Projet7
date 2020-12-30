const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Commentaire } = require('../models');

// Création d'un commentaire
exports.createCommentaire = (req, res, next) => {
  const commentaire = {
    messageId: req.body.messageId,
    userId: req.body.userId,
    content: req.body.content,
    attachment: req.body.attachment
    };
    Commentaire.create(commentaire)
    .then(commentaire => {
      res.send({ commentaire });     
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Une erreur s'est produite lors de la création du commentaire." });
  });
};

// Voir tout les commentaires
exports.getAllCommentaire = (req, res, next) => {
  Commentaire.findAll()
    .then((commentaire) => {
    res.send(commentaire);
    })
    .catch(err => {
    res.status(500).send({ message: "Il y a un problème" });
    });
};

// Supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
  const id = req.params.id;
  Commentaire.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Commentaire supprimé!" });
      } else {
        res.send({ message: `Impossible de supprimer id=${id}. ` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Impossible de supprimer le commentaire avec l'id=" + id });
    });
};