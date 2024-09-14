require('dotenv').config();
module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
      secret: process.env.JET_SECRET || 'notasecreta'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '149.56.140.45',
        user: process.env.MYSQL_USER || 'braulio',
        password: process.env.MYSQL_PASSWORD || 'Octubre90!',
        database: process.env.MYSQL_DB || 'lapopular',
    }
}