const bcrypt = require("bcrypt");
const auth = require("../../auth");
const TABLE = "usuarios";

const saltRounds = 10;

module.exports = function (database){

    let db = database;
    if (!db) {
        db = require('../../db/mysql');
    }

    function getAll() {
        return db.getAll(TABLE);
    }
    function getById(id) {
        return db.getById(TABLE, id);
    }

    function getByEmail(correo) {
        return db.customQuery(TABLE, {correo});
    }

    async function createNew(data) {
        data.correo = data.correo.toLowerCase();
        data.contrasena = await bcrypt.hashSync(data.contrasena, saltRounds);
        return db.createNew(TABLE, data);
    }
    function updateData(id, data) {
        return db.updateData(TABLE, id, data);
    }
    function deleteById(id) {
        return db.deleteById(TABLE, id);
    }
    return {
        getAll,
        getById,
        getByEmail,
        createNew,
        updateData,
        deleteById
    }
};
