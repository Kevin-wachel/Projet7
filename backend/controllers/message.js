const jwt = require('jsonwebtoken');
const sql = require("../config/connexiondb");

// Création d'un message
exports.createMessage = (req, res, next) => {
  let image = "";
  if(req.file !== undefined){
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const message = {
    userId: req.body.userId,
    contentMessage: req.body.contentMessage,
    attachment: image
  }
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
  sql.query("SELECT messages.id, contentMessage, attachment, userId, users.username, users.isAdmin FROM messages INNER JOIN users ON messages.userId = users.id ORDER BY messages.id DESC", 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Voir un message
exports.getOneMessage = (req, res, next) => {
  sql.query(`SELECT * FROM messages WHERE id=${req.params.id}`, req.params.id,
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
    return res.status(200).json({ message: 'Votre message a bien été supprimé !' });
  });
};
