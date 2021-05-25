const jwt = require('jsonwebtoken');
const sql = require("../config/connexiondb");

// Création d'un message
exports.createMessage = (req, res, next) => {
  const message = req.body
  sql.query("INSERT INTO messages SET ?", message, 
    function ( error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json({ message: 'Votre message a bien été posté !' });
  });
};

// Voir tout les messages
exports.getAllMessages = (req, res, next) => {
  sql.query("SELECT messages.id, contentMessage, attachment, likes, users.username FROM messages INNER JOIN users ON messages.userId = users.id", 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Voir tout les messages et les commentaires
exports.getAllMessagesCommentaires = (req, res, next) => {
  sql.query("SELECT messages.id, messages.contentMessage, messages.attachment, messages.likes, users.username, commentaires.contentCommentaire, commentaires.messageId FROM messages INNER JOIN users ON messages.userId = users.id CROSS JOIN commentaires ON messages.id = commentaires.messageId ORDER BY messages.id DESC", 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Supprimer les messages
exports.deleteMessage = (req, res, next) => {
  sql.query(`DELETE FROM messages WHERE id=${req.params.id}`, req.params.id,
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res
      .status(200)
      .json({ message: 'Votre message a bien été supprimé !' });
  });
};
