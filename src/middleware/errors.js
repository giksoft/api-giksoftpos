function createError(message = 'Error interno', code) {
    const error = new Error(message);
    if (code) {
        error.statusCode = code;
    }
    return error;
}

module.exports = createError;
