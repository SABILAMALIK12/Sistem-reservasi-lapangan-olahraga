const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    console.log('>>> Request masuk ke verifyToken');
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({Message: 'Token tidak ditemukan'});
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(401).json({message: 'Token tidak valid'});
        }
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) =>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Akses khusus admin'});
    }
    next();
};

module.exports ={verifyToken, isAdmin};