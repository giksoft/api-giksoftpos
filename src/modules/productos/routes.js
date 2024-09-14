const express = require('express');

const security = require('./security');
const response = require('../../red/responses');
const controller = require('./index');

const router = express.Router();

router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.get('/codigo/:id', asyncHandler(getProductByCode));
router.post('/', asyncHandler(createNew));
router.put('/:id', asyncHandler(updateData));
router.delete('/', asyncHandler(deleteById));

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
    const patients = await controller.getAll();
    response.success(req, res, patients, 200);
}
async function getById(req, res) {
    const patient = await controller.getById(req.params.id);
    response.success(req, res, patient, 200);
}
async function getProductByCode(req, res) {
    const product = await controller.getProductByCode(req.params.id);
    response.success(req, res, product, 200);
}
async function createNew(req, res) {
    await controller.createNew(req.body);
    response.success(req, res, 'Área registrada correctamente.', 201);
}
async function updateData(req, res) {
    await controller.updateData(req.params.id, req.body);
    response.success(req, res, 'Área actualizada correctamente.', 200);
}
async function deleteById(req, res) {
    await controller.deleteById(req.params.id);
    response.success(req, res, 'Área eliminada correctamente.', 200);
}

module.exports = router;
