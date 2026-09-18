const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const { buatBooking, bookingSaya } = require('../controllers/bookingControllers');

router.post('/', verifyToken, buatBooking);
router.get('/saya', verifyToken, bookingSaya);

module.exports = router;