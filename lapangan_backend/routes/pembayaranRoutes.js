const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { uploadBukti, verifikasi } = require('../controllers/pembayaranController');

router.post('/', verifyToken, upload.single('bukti_pembayaran'), uploadBukti);
router.put('/:id/verifikasi', verifyToken, isAdmin, verifikasi);

module.exports = router;