const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:id', auth, likeCtrl.addLikeDislike);

module.exports = router;