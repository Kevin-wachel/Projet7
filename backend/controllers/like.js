const sql = require("../config/connexiondb");

// Ajout d'un like à un message
exports.addLike = (req, res, next) => {
    const like = req.body
    sql.query('INSERT INTO likes SET ?', like, 
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(201).json({ message: 'Votre like a bien été ajouté !' });
    });
};
  
// Suppression d'un like à un message
exports.removeLike = (req, res, next) => {

sql.query(`DELETE FROM likes WHERE messageId=${req.params.id} && userId`,
    function (error, results, fields) {
        if (error) {
        return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre like a bien été supprimé !' });
    });
};

// Tout les likes 
exports.allLike = (req, res, next) => {
  sql.query(`SELECT * FROM likes`,
      function (error, results, fields) {
          if (error) {
          return res.status(400).json(error)
          }
          return res.status(200).json({ results });
      });
  };