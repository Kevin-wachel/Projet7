const jwt = require('jsonwebtoken');
const sequelize = require('../config/connexiondb');
const { Commentaire } = require('../models');

// Création d'un commentaire
exports.createCommentaire = (req, res, next) => {
    const commentaire = {
        usersId: req.body.idUSERS,
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
    Commentaire.deleteOne({ id: req.params.id })
   .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
   .catch(error => res.status(400).json({ error }));
};