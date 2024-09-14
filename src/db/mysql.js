const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

const pool = mysql.createPool(dbconfig);

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function getAll(table) {
    const sql = `SELECT * FROM ??;`;
    return query(sql, [table]);
}

function getProductByCode(table, id) {
    const sql = `SELECT * FROM ?? WHERE codigo = ?;`;
    return query(sql, [table, id]);
}


async function getById(table, id) {
    const sql = `SELECT * FROM ?? WHERE id = ?;`;
    return await query(sql, [table, id]);
}
async function getById(table, id) {
    const sql = `SELECT * FROM ?? WHERE id = ?;`;
    return await query(sql, [table, id]);
}

function createNew(table, data) {
    const sql = `INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?;`;
    return query(sql, [table, data, data]);
}

function updateData(table, id, data) {
    const sql = `UPDATE ?? SET ? WHERE id = ?;`;
    return query(sql, [table, data, id]);
}

function deleteById(table, id) {
    const sql = `UPDATE ?? SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;`;
    return query(sql, [table, id]);
}
function deleteFullById(table, id) {
    const sql = `DELETE FROM ?? WHERE id = ?;`;
    return query(sql, [table, id]);
}

function customQuery(table, consulta) {
    const sql = `SELECT * FROM ?? WHERE ?;`;
    return query(sql, [table, consulta]).then(results => {
        if (results && results.length > 0) {
            return results[0]
        } else {
            return null;
        }
    }).catch(error => {
        throw error;
    });
}

module.exports = {
    getAll,
    getProductByCode,
    getById,
    createNew,
    updateData,
    deleteById,
    deleteFullById,
    customQuery,
};
