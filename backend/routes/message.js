const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router;