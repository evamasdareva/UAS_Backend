const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwtUtils');

// Middleware untuk memeriksa token pada setiap permintaan yang membutuhkan otentikasi
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ message: 'Access denied. Token not provided.' });

    const { isValid, payload } = jwtUtils.verifyToken(token);
    
    if (!isValid) return res.status(401).json({ message: 'Invalid token.' });

    req.user = payload; // Menambahkan payload ke objek request untuk digunakan di rute berikutnya
    next();
}

// Membuat object PatientController
const patientController = new PatientController();

// Routes yang membutuhkan otentikasi
router.get('/patients', authenticateToken, patientController.index);
router.post('/patients', authenticateToken, patientController.store);
router.put('/patients/:id', authenticateToken, patientController.update);
router.delete('/patients/:id', authenticateToken, patientController.destroy);
router.get('/patients/:id', authenticateToken, patientController.show);
router.get('/patients/search/:keyword', authenticateToken, patientController.search);
router.get('/patients/positive-resource', authenticateToken, patientController.getPositiveResource);
router.get('/patients/recovered-resource', authenticateToken, patientController.getRecoveredResource);
router.get('/patients/dead-resource', authenticateToken, patientController.getDeadResource);

// Route untuk mendapatkan token
router.post('/login', (req, res) => {
    // Proses autentikasi pengguna (contoh sederhana)
    const username = req.body.username;
    const password = req.body.password;

    // Validasi pengguna
    if (username === 'user' && password === 'password') {
        const token = jwtUtils.generateToken({ username: 'user' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});

module.exports = router;
