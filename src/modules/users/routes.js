const express = require('express');

const security = require('./security');
const response = require('../../red/responses');
const controller = require('./index');
const bcrypt = require("bcrypt");
const auth = require("../../auth");
const saltRounds = 10;
const router = express.Router();

router.get('/', security(), asyncHandler(getAll));
router.get('/:id', security(), asyncHandler(getById));
router.post('/current', asyncHandler(getByEmail));
router.post('/', asyncHandler(createNew));
router.put('/:id', security(), asyncHandler(updateData));
router.delete('/', security(), asyncHandler(deleteById));

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
async function getAll(req, res) {
    const users = await controller.getAll();
    response.success(req, res, users, 200);
}
async function getById(req, res) {
    const user = await controller.getById(req.params.id);
    response.success(req, res, user, 200);
}

async function getByEmail(req, res) {
    const user = await controller.getByEmail(req.body.correo);
    response.success(req, res, user, 200);
}
async function createNew(req, res) {
    await controller.createNew(req.body);
    response.success(req, res, 'Usuario agregado correctamente.', 201);
}
async function updateData(req, res) {
    await controller.updateData(req.params.id, req.body);
    response.success(req, res, 'Usuario actualizado correctamente.', 200);
}
async function deleteById(req, res) {
    await controller.deleteById(req.params.id);
    response.success(req, res, 'Usuario eliminado correctamente.', 200);
}

module.exports = router;
