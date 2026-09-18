const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const createUser = (data, callback) => {
  const { nama_users, telepon, email, password, role } = data;
  db.query(
    'INSERT INTO users (nama_users, telepon, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [nama_users, telepon, email, password, role || 'pelanggan'],
    callback
  );
};

module.exports = { findUserByEmail, createUser };