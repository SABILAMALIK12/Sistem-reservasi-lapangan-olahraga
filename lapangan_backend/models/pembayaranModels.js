const db = require('../config/db');
const createPembayaran = (data, callback) =>{
    const {booking_id, bukti_pembayaran} = data;
    db.query(
        `INSERT INTO pembayaran (booking_id, bukti_pembayaran, status_pembayaran, tanggal_upload)
        VALUES (?, ?, 'menunggu', NOW())`,
        [booking_id, bukti_pembayaran],
        callback
    );
};

const getPembayaranById = (id, callback) => {
    db.query('SELECT * FROM pembayaran WHERE id = ?', [id], callback);
};

const verifikasiPembayaran = (id, status, admin_id, callback) =>{
    db.query(
        `UPDATE pembayaran SET status_pembayaran = ?, diverifikasi_oleh = ?, tanggal_verifikasi = NOW() WHERE id = ?`,
        [status, admin_id, id],
        callback
    );
};

module.exports = {createPembayaran, getPembayaranById, verifikasiPembayaran};