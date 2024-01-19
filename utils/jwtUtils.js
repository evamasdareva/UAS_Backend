const jwt = require('jsonwebtoken');

const secretKey = 'yourSecretKey'; // Ganti dengan kunci rahasia yang kuat

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token berlaku selama 1 jam
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { isValid: true, payload: decoded };
    } catch (error) {
        return { isValid: false, payload: null };
    }
}

module.exports = { generateToken, verifyToken };
