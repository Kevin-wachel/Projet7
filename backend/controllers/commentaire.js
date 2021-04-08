const jwt = require('jsonwebtoken');
const sql = require('../config/connexiondb');

// Création d'un commentaire
exports.createCommentaire = (req, res, next) => {
  const commentaire = req.body
  sql.query('INSERT INTO commentaires SET ?', commentaire, 
  function ( error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json({ message: 'Votre commentaire a bien été posté !' });
  });
};

// Voir tout les commentaires
exports.getAllCommentaire = (req, res, next) => {
  sql.query("SELECT commentaires.id, messageId, userId, content, users.username FROM commentaires INNER JOIN users ON commentaires.userId = users.id", 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
  sql.query(`DELETE FROM commentaires WHERE id=${req.params.id}`, req.params.id,
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res
      .status(200)
      .json({ message: 'Votre commentaire a bien été supprimé !' });
  });
};