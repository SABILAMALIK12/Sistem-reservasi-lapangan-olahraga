const { cekBentrok, createBooking, getBookingByUser, } = require('../models/bookingModels');
const { getLapanganById} = require('../models/lapanganModels');

const buatBooking = (req, res) => {
    console.log('>> Request masuk ke buatBooking');
    const {lapangan_id, jadwal_mulai, jadwal_selesai } = req.body;
    const user_id = req.user.id;

    if (!lapangan_id || !jadwal_mulai || !jadwal_selesai){
        return res.status(400).json({Message: 'Lapangan dan jadwal wajib diisi'});
    }
    if (new Date(jadwal_mulai) >= new Date(jadwal_selesai)){
        return res.status(400).json({message: 'Jadwal selesai harus setelah jadwal mulai'});
    }
    
    getLapanganById(lapangan_id, (err, lapangan) => {
        if (err) return res.status(500).json({message: 'Terjadi kesalahan server'});
        if (lapangan.length === 0 ){
            return res.status(404).json({message: 'Lapangan tidak ditemukan'});
        }
        
        cekBentrok(lapangan_id, jadwal_mulai, jadwal_selesai, (err, hasil) =>{
            if (err) return res.status(500).json({message: 'Terjadi kesalahan server'});
            
            if (hasil.length >0){
                return res.status(409).json({message: 'Jadwal sudah dibooking, silahkan pilih jadwal lain'});
            }
            createBooking({user_id, lapangan_id, jadwal_mulai, jadwal_selesai}, (err, result) => {
                if(err) return res.status(500).json({message: 'Gagal membuat booking'});
                res.status(201).json({
                    message: 'Booking berhasil dibuat',
                    booking_id: result.insertId
                });
            });
        });
    });
};

const bookingSaya = (req, res) =>{
    getBookingByUser(req.user.id, (err, result) => {
        if (err) return res.status(500).json({message: 'Terjadi kesalahan server'});
        res.json({ data: result});
    });
};

module.exports = { buatBooking, bookingSaya};
