const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/parcelController');

router.post('/', auth, ctrl.createParcel);
router.get('/me', auth, ctrl.getMyParcels);
router.get('/:id', auth, ctrl.getParcel);
router.get('/', ctrl.listParcels); // public listing

module.exports = router;
