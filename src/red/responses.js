exports.success = (req, res, message = "", status = 200, insertId = null) => {
    res.status(status).send({
        error: false,
        status: status,
        insertId: insertId ? insertId.insertId : null,
        body: message
    })
}

exports.error = (req, res, message = "Error interno", status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        body: message
    })
}
