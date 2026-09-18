const { getAllLapangan, getLapanganById, createLapangan, updateLapangan, deleteLapangan } = require('../models/lapanganModels');

const semuaLapangan = (req, res) => {
    getAllLapangan((err, results) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
        res.json({ data: results });
    });
};

const detailLapangan = (req, res) => {
    const { id } = req.params;
    getLapanganById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan server ' });
        if (results.length === 0) {
            return res.status(404).json({ message: 'Lapangan tidak ditemukan' });
        }
        res.json({ data: results[0] });
    });
};

const tambahLapangan = (req, res) => {
    const { nama_lapangan, harga_per_jam } = req.body;

    if (!nama_lapangan || !harga_per_jam) {
        return res.status(400).json({ message: 'Nama Lapangan dan harga perjam wajib diisi' });
    }

    createLapangan({ nama_lapangan, harga_per_jam }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal Menambahkan Lapangan' });
        res.status(201).json({ message: ' Lapangan berhasil ditambahkan', lapangan_id: results.insertId });
    });
};

const ubahLapangan = (req, res) => {
    const { id } = req.params;
    const { nama_lapangan, harga_per_jam } = req.body;

    if (!nama_lapangan || !harga_per_jam) {
        return res.status(400).json({ message: ' Nama Lapangan dan harga wajib diisi' });
    }

    getLapanganById(id, (err, lapangan) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan server ' });
        if (lapangan.length === 0) {
            return res.status(404).json({ message: 'Lapangan tidak ditemukan' });
        }

        updateLapangan(id, { nama_lapangan, harga_per_jam }, (err) => {
            if (err) return res.status(500).json({ message: 'Gagal memperbaarui lapangan' });
            res.json({ message: 'Lapangan berhasil diperbarui' })
        });
    });
};

const hapusLapangan = (req, res) => {
    const { id } = req.params;

    getLapanganById(id, (err, lapangan) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
        if (lapangan.length === 0) {
            return res.status(404).jsom({ message: 'Lapangan tidak ditemukan' });
        }

        deleteLapangan(id, (err) => {
            if (err) return res.status(500).json({ message: 'Gagal menghapus lapangan' });
            res.json({ message: 'Lapangan berhasil dihapus' });
        });
    });
};

module.exports = { semuaLapangan, detailLapangan, tambahLapangan, ubahLapangan, hapusLapangan };