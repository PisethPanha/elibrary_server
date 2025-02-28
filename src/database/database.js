const mysql = require('mysql2')



    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "khmer_elib",
    })
    module.exports = {connection}


