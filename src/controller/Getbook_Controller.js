const db = require('../database/database')
const path = require("path");

function Get_all_book_controller(req, res) {
    const { offset, limit, language, status } = req.query
    const query = `SELECT * FROM book WHERE language LIKE '${language}%' AND status = '${status}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result);
    })
}

function GetBookUserRequested(req, res){
    const {id} = req.query
    const query = `SELECT * FROM book WHERE id = '${id}'`
    db.connection.query(query, (err, result) => {
        err ? res.json({message: "no found"}) : res.json(result) 
    })
}

function handleApprovalController(req,res){
    const {id} = req.query
    const query = `UPDATE book SET status = 'true' WHERE id = ${id} `
    db.connection.query(query, (err, result) =>{
        err ? res.json({message: err}) : res.json({message: "approved"})
    } )
}

function Get_book_search_controller(req, res) {
    const { keyword, type } = req.query
    const query = `SELECT * FROM book WHERE type LIKE '${type}%' AND status = 'true' OR Title LIKE '${keyword}%' AND status = 'true' OR Title LIKE '%${keyword}%' AND status = 'true' OR describetion LIKE '%${keyword}%' AND status = 'true'`
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result)
    })
}

function Get_book_as_keyword_controller(req, res) {
    const { keyword } = req.query
    const query = `SELECT * FROM book WHERE Title = '${keyword}' AND status = 'true'`
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result)
    })
}



function Get_book_as_lang_controller(req, res) {
    const { leng } = req.query;
    const query = `SELECT * FROM book WHERE language='${leng}' AND status = 'true'`;
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result);
    })


}
function Get_book_as_type_controller(req, res) {
    const { type } = req.query;
    const query = `SELECT * FROM book WHERE type='${type}' AND status = 'true'`;
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result);
    })


}
function deleteController(req, res) {
    const { bookId } = req.query
    const query = `DELETE FROM book WHERE id = '${bookId}'`
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.send(`the book id=${bookId} deleted !!!`)
    })
}
function EditController(req, res) {
    const { BookId, title, description, link, author, publisher, image1, image2, image3, language } = req.body
    const query = `UPDATE book SET Title= '${title}', describetion = '${description}', 	link_download = '${link}', autor = '${author}', publisher = '${publisher}', img = '${image1}', img_content1 = '${image1}', img_content2 = '${image2}', img_content3 = '${image3}', language = '${language}' WHERE id = '${BookId}'`;
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.send("Book updated !!!")
    })
}
function AddBookController(req, res) {
    const { status, type, title, description, link, author, publisher, image1, image2, image3, language, date } = req.body

    let ID = 0;
    const queryLastId = 'UPDATE auto_increase SET auto_increment = auto_increment + 1 WHERE id = 1';
    
    db.connection.query(queryLastId, (err, result) => {
        err ? res.send(err) : 
        db.connection.query(` SELECT auto_increment FROM auto_increase WHERE id = 1 `,(err, result) => {
            err ? res.json({message: err}) : ID = result[0].auto_increment
            const query = `INSERT INTO book ( Title, describetion, autor, publisher, publish_date, img, img_content1, img_content2, img_content3,  link_download, language, type, view, download, status ) 
            VALUES ( '${title}','${description}', '${author}', '${publisher}', '${date}', '${ID}${image1}', '${ID + image1}', '${ID + image2}', '${ID + image3}', '${link}', '${language}', '${type}', 0, 0, '${status}' )`
            db.connection.query(query, (err, result) => {
                err ? res.send(err) : res.json({id: ID-1 })
                console.log(ID);
            })
        })
        
    })

}

function getUserRequestItems(req, res){
    const { items } = req.query
    const placeholder = items.map((ele, i) => `${ele}`).join(",")
    const query = `SELECT * FROM book WHERE id IN (${placeholder})`
    db.connection.query(query, (err, result) => {
        err ? res.json({message: err}) : res.json(result)
    })
}

function getEndIdController(req, res) {
    let ID = 0;
    const queryLastId = 'SELECT id FROM book ORDER BY id DESC LIMIT 1';
    db.connection.query(queryLastId, (err, result) => {
        err ? res.send(err) : res.json(result[0].id)
    })
}
function getBookAsTypeController(req, res) {
    const { keyword, catagory, language } = req.query
    const query = `SELECT * FROM book WHERE type LIKE '${catagory}%' AND status = 'true'`;
    db.connection.query(query, (err, result) => {
        err ? res.send(err) : res.json(result);
    })
}

function testGetID(req,res){
    let ID = 0;
    db.connection.query(` SELECT auto_increment FROM auto_increase WHERE id = 1 `,(err, result) => {
        err ? res.json({message: err}) : ID = result[0].auto_increment
    })
    console.log(ID);
}

function AdminSearchController(req, res) {
    const { keyword, language, catagory } = req.query
    const query = `SELECT * FROM book WHERE Title LIKE '${keyword}%' AND type LIKE '${catagory}%' AND language LIKE '${language}%' AND status = 'true' OR Title LIKE '%${keyword}%' AND type LIKE '${catagory}%' AND language LIKE '${language}%' AND status = 'true' `
    db.connection.query(query, (err, result) => {
        err ? res.json(err) : res.json(result)
    })
}
function AddViewController(req, res) {
    const { id } = req.query

    const query1 = `SELECT view FROM book WHERE id = '${id}'`

    db.connection.query(query1, (err, result) => {
        err ? res.json(err) : db.connection.query(`UPDATE book SET view = '${result[0].view + 1}' WHERE id = '${id}'`, (err, result) => {
            err ? res.json(err) : db.connection.query(`SELECT view FROM book WHERE id = '${id}'`, (err, result) => {
                err ? res.json(err) : res.json(result)
            })
        })
    })
}
function AddDownloadController(req, res) {
    const { id } = req.query

    const query1 = `SELECT download FROM book WHERE id = '${id}'`

    db.connection.query(query1, (err, result) => {
        err ? res.json(err) : db.connection.query(`UPDATE book SET download = '${result[0].download + 1}' WHERE id = '${id}'`, (err, result) => {
            err ? res.json(err) : db.connection.query(`SELECT download FROM book WHERE id = '${id}'`, (err, result) => {
                err ? res.json(err) : res.json(result)
            })
        })
    })
}

function ChangeDownloadLinkController(req, res) {
    const { id, link } = req.query
    const query = `UPDATE book SET link_download = '${link}' WHERE id = '${id}'`
    db.connection.query(query, (err, result) => {
        err ? res.json(err) : db.connection.query(`SELECT link_download FROM book WHERE id = '${id}'`, (err, result) => {
            err ? res.json(err) : res.json({ message: "updated" })
        })
    })
}

function AdminLoginController(req, res) {
    const { username, password } = req.body
    const query = `SELECT * FROM admin WHERE username = '${username}'`
    db.connection.query(query, (err, result) => {
        err ? res.json(err) : result.length == 0 ? res.json({ message: "wrong username !!!" }) :
            result[0].password == password ? res.json({ message: "bdskfkfjdskflkfmlkdfkdsnfksdfkadsfdkvfdkjgnfgjka" }) : res.json({ message: "wrong password !!!" })

    })
}

function ProtectRouteAdminController(req, res) {
    const { token } = req.body
    token == "bdskfkfjdskflkfmlkdfkdsnfksdfkadsfdkvfdkjgnfgjka" ? res.json({ message: "alkdsaldlsakdslkadlksadksandlsad" }) : res.json({ message: "unauth" })
}

function ReadPDF(req, res) {
    const filePath = path.join(__dirname, "../routes/uploads", req.params.filename);

    // Check if the file exists before sending
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File error:", err);
            res.status(404).send("File not found!");
        }
    });
}

function GetMostViewController(req, res){
    const query = `SELECT * FROM book WHERE status = 'true' ORDER BY view DESC LIMIT 10`
    db.connection.query(query, (err, result) => {
        err ? res.json({message: err}) : res.json(result)
    })
}
function GetMostDownloadController(req, res){
    const query = `SELECT * FROM book WHERE status = 'true' ORDER BY download DESC LIMIT 10`
    db.connection.query(query, (err, result) => {
        err ? res.json({message: err}) : res.json(result)
    })
}

module.exports = { getUserRequestItems, testGetID, handleApprovalController, GetBookUserRequested, GetMostDownloadController, GetMostViewController, ReadPDF, ProtectRouteAdminController, AdminLoginController, ChangeDownloadLinkController, AddDownloadController, AddViewController, AdminSearchController, Get_book_as_type_controller, getBookAsTypeController, Get_book_as_keyword_controller, Get_book_search_controller, getEndIdController, AddBookController, EditController, Get_all_book_controller, Get_book_as_lang_controller, deleteController }
