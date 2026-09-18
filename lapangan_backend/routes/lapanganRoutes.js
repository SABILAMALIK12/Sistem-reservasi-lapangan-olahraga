const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin }= require('../middleware/authMiddleware');
const { semuaLapangan, detailLapangan, tambahLapangan, ubahLapangan, hapusLapangan } = require('../controllers/lapanganControllers');

router.get('/', verifyToken, semuaLapangan);
router.get('/:id', verifyToken, detailLapangan);
router.post('/', verifyToken, isAdmin, tambahLapangan);
router.put('/:id', verifyToken, isAdmin, ubahLapangan)
router.delete('/:id', verifyToken, isAdmin, hapusLapangan);

module.exports = router;