const response = require('./responses');

function errors(err, req, res, next) {
    console.error('ERROR', err);

    const { message = 'Error interno', statusCode = 500 } = err;
    response.error(req, res, message, statusCode);
}

module.exports = errors;
