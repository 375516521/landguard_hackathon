const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/paymentController');


router.post('/checkout', auth, ctrl.checkout);


module.exports = router;
