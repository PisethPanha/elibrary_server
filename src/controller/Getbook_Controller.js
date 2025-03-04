const db = require('../database/database');
const path = require("path");

// Helper function to prevent multiple responses
function sendResponse(res, status, data) {
    if (!res.headersSent) {
        res.status(status).json(data);
    }
}

// ✅ Get all books with pagination & filtering by language
function Get_all_book_controller(req, res) {
    try {
        const { offset = 0, limit = 10, language = '' } = req.query;
        const query = `SELECT * FROM book WHERE language LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`;

        db.connection.query(query, [`${language}%`, Number(limit), Number(offset)], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, result);
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Search books by title or type
function Get_book_search_controller(req, res) {
    try {
        const { keyword = '', type = '' } = req.query;
        const query = `SELECT * FROM book WHERE Title LIKE ? OR type LIKE ?`;

        db.connection.query(query, [`${keyword}%`, `${type}%`], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, result);
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Get book by exact title
function Get_book_as_keyword_controller(req, res) {
    try {
        const { keyword } = req.query;
        const query = `SELECT * FROM book WHERE Title = ?`;

        db.connection.query(query, [keyword], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, result);
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Get books by language
function Get_book_as_lang_controller(req, res) {
    try {
        const { leng } = req.query;
        const query = `SELECT * FROM book WHERE language = ?`;

        db.connection.query(query, [leng], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, result);
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Delete book by ID
function deleteController(req, res) {
    try {
        const { bookId } = req.query;
        const query = `DELETE FROM book WHERE id = ?`;

        db.connection.query(query, [bookId], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, { message: `Book ID=${bookId} deleted!` });
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Edit book details
function EditController(req, res) {
    try {
        const { BookId, title, description, link, author, publisher, image1, image2, image3, language } = req.body;
        const query = `UPDATE book SET Title = ?, describetion = ?, link_download = ?, autor = ?, publisher = ?, img = ?, img_content1 = ?, img_content2 = ?, img_content3 = ?, language = ? WHERE id = ?`;

        db.connection.query(query, [title, description, link, author, publisher, image1, image1, image2, image3, language, BookId], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });
            sendResponse(res, 200, { message: "Book updated!" });
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Add a new book
function AddBookController(req, res) {
    try {
        const { type, title, description, link, author, publisher, image1, image2, image3, language, date } = req.body;

        // Get last ID
        db.connection.query('SELECT id FROM book ORDER BY id DESC LIMIT 1', (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });

            let ID = result.length ? result[0].id + 1 : 1;
            const query = `INSERT INTO book (Title, describetion, autor, publisher, publish_date, img, img_content1, img_content2, img_content3, link_download, language, type, view, download, read_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 'read_link')`;

            db.connection.query(query, [title, description, author, publisher, date, `${ID}${image1}`, `${ID}${image1}`, `${ID}${image2}`, `${ID}${image3}`, link, language, type], (err, result) => {
                if (err) return sendResponse(res, 500, { error: err.message });
                sendResponse(res, 200, { id: ID });
            });
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Admin Login
function AdminLoginController(req, res) {
    try {
        const { username, password } = req.body;
        const query = `SELECT * FROM admin WHERE username = ?`;

        db.connection.query(query, [username], (err, result) => {
            if (err) return sendResponse(res, 500, { error: err.message });

            if (result.length === 0) return sendResponse(res, 401, { message: "Wrong username!" });
            if (result[0].password !== password) return sendResponse(res, 401, { message: "Wrong password!" });

            sendResponse(res, 200, { message: "Login successful!" });
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

// ✅ Read PDF File
function ReadPDF(req, res) {
    try {
        const filePath = path.join(__dirname, "../routes/uploads", req.params.filename);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("File error:", err);
                res.status(404).send("File not found!");
            }
        });
    } catch (error) {
        sendResponse(res, 500, { error: "Internal server error" });
    }
}

module.exports = {
    Get_all_book_controller,
    Get_book_search_controller,
    Get_book_as_keyword_controller,
    Get_book_as_lang_controller,
    deleteController,
    EditController,
    AddBookController,
    AdminLoginController,
    ReadPDF
};
