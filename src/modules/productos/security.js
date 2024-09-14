const auth = require("../../auth");
module.exports = function authCheck() {
    function middleware(req, res, next) {
        const id = req.body.id;
        auth.tokenCheck.confirmToken(req, id)
        next();
    }
    return middleware
}