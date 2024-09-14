const bcrypt = require("bcrypt");
const TABLE = "articulo";

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
    function getProductByCode(id) {
        return db.getProductByCode(TABLE, id);
    }
    async function createNew(data) {
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
        getProductByCode,
        createNew,
        updateData,
        deleteById
    }
};
