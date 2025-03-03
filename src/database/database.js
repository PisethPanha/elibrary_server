const mysql = require('mysql2')



    const connection = mysql.createConnection({
        host: "hopper.proxy.rlwy.net" ,
        user: "root",
        password: "DzAbEaJsXtCtUruossPMrTRRdifrmWza",
        database: "railway",
        port: "54123"
        
    })
    module.exports = {connection}


