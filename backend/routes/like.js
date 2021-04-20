const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.post('/:id', /*auth,*/ likeCtrl.addLike);
router.delete('/:id', /*auth,*/ likeCtrl.removeLike);

module.exports = router;