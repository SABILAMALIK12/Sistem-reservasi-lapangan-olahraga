const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModels');

const register = async (req, res) => {
  const { nama_users, telepon, email, password } = req.body;

  if (!nama_users || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
  }

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    createUser({ nama_users, telepon, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal mendaftarkan user' });
      res.status(201).json({ message: 'Registrasi berhasil' });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan server' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login berhasil', token, role: user.role });
  });
};

module.exports = { register, login };