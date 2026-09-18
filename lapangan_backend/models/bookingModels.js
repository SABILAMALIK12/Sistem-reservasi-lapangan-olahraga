const db = require('../config/db');

const cekBentrok = (lapangan_id, jadwal_mulai, jadwal_selesai, callback) => {
    const query = `
    SELECT * FROM bookings
    WHERE lapangan_id = ?
        AND status_booking != 'dibatalkan'
        AND jadwal_mulai < ?
        AND jadwal_selesai > ? 
    `;
    db.query(query, [lapangan_id, jadwal_selesai, jadwal_mulai], callback);
};

const createBooking = (data, callback) => {
    const {user_id, lapangan_id, jadwal_mulai, jadwal_selesai} = data;
    db.query(
        `INSERT INTO bookings (user_id, lapangan_id, jadwal_mulai, jadwal_selesai, status_booking)
        VALUES (?, ?, ?, ?, 'menunggu')`,
        [user_id, lapangan_id, jadwal_mulai, jadwal_selesai],
        callback
    );
};

const getBookingByUser = (user_id, callback) =>  {
    db.query (
        `SELECT b.*, 1.nama_pelanggan, 1.harga_per_jam
        FROM bookings b
        JOIN lapangan 1 ON b.lapangan_id = 1.id
        WHERE b.user_id = ?
        ORDER BY b.jadwal_mulai DESC`,
        [user_id],
        callback
    );
};

const getBookingById = (id, callback) => {
  db.query('SELECT * FROM bookings WHERE id = ?', [id], callback);
};

module.exports = {cekBentrok, createBooking, getBookingByUser, getBookingById};