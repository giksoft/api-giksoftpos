const TABLE = "usuarios";
const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports = function (database){

    let db = database;
    if (!db) {
        db = require('../../db/mysql');
    }
    async function login(correo, password) {
        const data = await db.customQuery(TABLE, { correo: correo });
        if (data === null) {
            throw new Error('Credenciales inválidas.');
        }
        return bcrypt.compare(password, data.contrasena).then(result => {
            if (result) {
                return auth.tokenAssignment({ ...data });
            } else {
                throw new Error('Credenciales inválidas.');
            }
        }).catch(error => {
            throw error;
        });
    }
    async function createNew(data) {
        const authData = {
            id: data.id
        }
        if (data.correo) {
            authData.correo = data.correo;
        }

        if (data.contrasena) {
            authData.contrasena = await bcrypt.hash(data.contrasena.toString(), 5);
        }

        return db.createNew(TABLE, authData);
    }

    return {
        createNew,
        login
    }
};
