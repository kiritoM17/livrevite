const express = require('express');
const controller = require('./../controllers/userController');
const router = express.Router();
router.post('/create',controller.create);
router.post('/sigin/email',controller.singinByEmail);
router.get('/findAll',controller.findAll);
router.get('/findOne/:userId',controller.findOne);
module.exports = router;