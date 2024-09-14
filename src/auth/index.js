const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/errors');

const secret = config.jwt.secret;

function tokenAssignment(data) {
    return jwt.sign(data, secret);
}

function tokenVerification(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw error('Token inválido o expirado', 401);
    }
}

function getToken(authorization) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw error('Formato de autorización inválido', 401);
    }
    return authorization.replace('Bearer ', '');
}

const tokenCheck = {
    confirmToken: function (req) {
        const decoded = headerDecrypted(req);
    },
};

function headerDecrypted(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = tokenVerification(token);
    req.user = decoded;
    return decoded;
}

module.exports = {
    tokenAssignment,
    tokenCheck,
};
