const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');
const lapanganRoutes = require('./routes/lapanganRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/lapangan', lapanganRoutes);

app.get('/', (req, res) => {
  res.send('Server backend reservasi lapangan olahraga jalan');
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});