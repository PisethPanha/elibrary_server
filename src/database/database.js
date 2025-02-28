const mysql = require('mysql2')



    const connection = mysql.createConnection({
        host: "bho9cystmcal7phrxsmp-mysql.services.clever-cloud.com",
        user: "uhcjtzhelk4m7qyr",
        password: "RhzRrbzNOkSe6LL29hzy",
        database: "bho9cystmcal7phrxsmp",
    })
    module.exports = {connection}


