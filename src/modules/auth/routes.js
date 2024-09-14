const express = require('express');
const response = require('../../red/responses');
const controller = require('./index');

const router = express.Router();

router.post('/login', asyncHandler(login));
// Función para envolver los controladores async y manejar los errores
function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}
async function login(req, res) {
    const token = await controller.login(req.body.correo, req.body.contrasena);
    response.success(req, res, token, 200);
}
module.exports = router;
