const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../config/connexiondb');

// Inscription
exports.signup = (req, res, next) => {
  const user = req.body
  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash
    sql.query("INSERT INTO users SET ?", user, 
    function ( error, results, fields ) {
      if (error) {
        console.log(error);
        return res.status(400).json(error.sqlMessage);
      } 
      return res.status(201).json({ message: "Utilisateur bien enregistré" });
    });
  });
};

// Connexion
exports.login = (req, res, next) => {
  const user = req.body
  if (user.email && user.password){
    sql.query("SELECT * FROM users WHERE email = ?", user.email, 
      function ( error, results, fields ) {
          if (error){
            console.log(error)
            return res.status(400).json(error);
          }
          if (results.length <= 0){
            return res.status(500).json({ message: "Email inconnu"});
          } else {
            bcrypt.compare(user.password, results[0].password)
            .then(valid => {
                if(!valid){
                  return res.status(500).json({ message: "Email ou mot de passe incorrect"});
                } else {
                  return res.status(200).json({
                    token: jwt.sign(                    
                      { userId: results[0].id, isAdmin: results[0].isAdmin },
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '24h' }
                      )
                  });
                };
            })
            .catch(error => res.status(500).json({ error }));
          };
      });
  };
};

// Tout les utilisateurs
exports.getAllUsers = (req, res, next) => {
  sql.query("SELECT * FROM users", 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Avoir un utilisateur
exports.getOneUser = (req, res, next) => {
  sql.query(`SELECT id, username, email, isAdmin, bio FROM users WHERE id=${req.params.id}`, req.params.id,
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  sql.query(`UPDATE users SET email = '${req.body.email}', username = '${req.body.username}', bio = '${req.body.bio}', isAdmin = '${req.body.isAdmin}'  WHERE id = '${req.params.id}'`, 
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ results });
  });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  sql.query(`DELETE FROM users WHERE id=${req.params.id}`, req.params.id,
  function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: 'Votre compte a bien été supprimé !' });
  });
};
