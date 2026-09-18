const { createPembayaran, verifikasiPembayaran, getPembayaranById} = require('../models/pembayaranModels.js');
const { getBookingById } = require('../models/bookingModels');

const uploadBukti = (req, res) => {
    const { booking_id } = req.body;
    const user_id = req.user.id;

    if (!booking_id){
        return res.status(400).json({message: 'booking_id wajib diisi '});
    }
    if(!req.file){
        return res.status(400).json({message: 'Bukti pembayaran (file) wajib diupload'});
    }

    getBookingById(booking_id, (err, booking) => {
        if(err) return res.status(500).json({message: 'Terjadi Kesalahan server'});
        if(booking.length ===0 ) {
            return res.status(404).json({message: 'Booking tidak ditemukan'});
        }
        if (booking[0].user_id !== user_id) {
            return res.status(403).json({message: 'Booking ini bukan milik anda'});
        }
        createPembayaran({ booking_id, bukti_pembayaran: req.file.filename }, (err, result) =>{
            if (err) return res.status(500).json ({message: 'Gagal menyimpan bukti pembayaran'});
            res.status(201).json({message: 'Bukti pembayaran berhasil diupload', pembayara_id: result.insertId});
        });
    });
};

const verifikasi = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const admin_id = req.user.id;

    if (!['diverifikasi', 'ditolak'].includes(status)) {
        return res.status(400).json({ message: "Status harus 'diverifikasi' atau 'ditolak'" });
    }

    getPembayaranById(id, (err, pembayaran) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
        if (pembayaran.length === 0) {
            return res.status(404).json({ message: 'Data pembayaran tidak ditemukan' });
        }

        verifikasiPembayaran(id, status, admin_id, (err) => {
            if (err) return res.status(500).json({ message: 'Gagal memperbarui status pembayaran' });
            res.json({ message: `Pembayaran berhasil di${status === 'diverifikasi' ? 'verifikasi' : 'tolak'}` });
        });
    });
};

module.exports = {uploadBukti, verifikasi};