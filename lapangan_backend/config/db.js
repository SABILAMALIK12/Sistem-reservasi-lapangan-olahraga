require('dotenv').config();
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err)=> {
    if(err) {
        console.error('Koneksi database gagal:', err.message);
        return;
    }
    console.log('Koneksi database berhasil');
});

module.exports = db;
