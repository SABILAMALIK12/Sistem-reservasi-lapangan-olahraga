const db = require('../config/db');

const getAllLapangan = (callback) =>{
    db.query('SELECT * FROM lapangan', callback);
};

const getLapanganById = (id, callback) => {
    db.query('SELECT *FROM lapangan WHERE id = ?', [id], callback);
};

const createLapangan = (data, callback) => {
    const {nama_lapangan, harga_per_jam } = data;
    db.query('INSERT INTO lapangan (nama_lapangan, harga_per_jam) VALUES (?, ? )',
        [nama_lapangan, harga_per_jam],
        callback
    );
};

const updateLapangan = (id, data, callback) => {
    const {nama_lapangan, harga_per_jam } = data;
    db.query ('UPDATE lapangan SET nama_lapangan = ?, harga_per_jam = ? WHERE id = ?',
        [nama_lapangan, harga_per_jam, id],
        callback
    );
};

const deleteLapangan = (id, callback) => {
    db.query ('DELETE FROM lapangan WHERE id = ?', [id], callback);
};


module.exports = {getAllLapangan, getLapanganById, createLapangan, updateLapangan, deleteLapangan};