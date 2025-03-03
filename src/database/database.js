const mysql = require('mysql2')



    const connection = mysql.createConnection({
        host: "bqpchigzuhyeltchb2ff-mysql.services.clever-cloud.com" ,
        user: "uazqoodj3xoeyoyl",
        password: "hc2YrowbYEZEZp0s5wv",
        database: "bqpchigzuhyeltchb2ff",
        port: "20600"
    })
    module.exports = {connection}


