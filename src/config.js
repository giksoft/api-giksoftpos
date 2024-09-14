require('dotenv').config();
module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
      secret: process.env.JET_SECRET || 'notasecreta'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'giksoft_pos_user_master',
        password: process.env.MYSQL_PASSWORD || '943167qwerty!',
        database: process.env.MYSQL_DB || 'giksoft_pos_master',
    }
}
