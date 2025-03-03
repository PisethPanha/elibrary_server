const mysql = require('mysql2')



    const connection = mysql.createConnection({
        host: "bfeetst4vbxy2lvuhbp1-mysql.services.clever-cloud.com" ,
        user: "uhcjtzhelk4m7qyr",
        password: "RhzRrbzNOkSe6LL29hzy",
        database: "bfeetst4vbxy2lvuhbp1",
        port: "20417"
    })
    module.exports = {connection}


