const getbook_controller = require('../controller/Getbook_Controller');
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const express = require('express');
const db = require('../database/database').connection
function Getbook(app) {
    app.get("/getbook", getbook_controller.Get_all_book_controller);
}
function Get_book_as_lang(app) {
    app.get("/getbookastype", getbook_controller.Get_book_as_lang_controller)
}
function GetBookUserRequestedRoute(app){
    app.get("/book-requested", getbook_controller.GetBookUserRequested);
}
function deleteRoute(app) {
    app.get("/delete", getbook_controller.deleteController)
}
function EditRoute(app) {
    app.post("/edit", getbook_controller.EditController)
}
function AddBookRoute(app) {
    app.post("/add", getbook_controller.AddBookController)
}
function getEndIdRoute(app) {
    app.get("/id", getbook_controller.getEndIdController)
}
function GetBookSearchRoute(app) {
    app.get('/search', getbook_controller.Get_book_search_controller)
}
function GetBookAsKeywordRoute(app) {
    app.get("/keyword", getbook_controller.Get_book_as_keyword_controller)
}
function GetBookAsTypeRoute(app) {
    app.get("/type", getbook_controller.getBookAsTypeController)
}
function AdminSearchRoute(app) {
    app.get("/admin_search", getbook_controller.AdminSearchController)
}
function AddViewRoute(app) {
    app.get('/add_view', getbook_controller.AddViewController)
}
function AddDownloadRoute(app) {
    app.get("/add_download", getbook_controller.AddDownloadController)
}
function ChangeDownloadLinkRoute(app) {
    app.get("/changeDownloadLink", getbook_controller.ChangeDownloadLinkController)
}
function AdminLoginRoute(app) {
    app.post("/login", getbook_controller.AdminLoginController)
}
function ProtectRouteAdminRoute(app) {
    app.post("/protect_route", getbook_controller.ProtectRouteAdminController)
}
function ReadPDFRoute(app) {
    app.get("/pdf/:filename", getbook_controller.ReadPDF)
}


const storage = multer.memoryStorage()
// diskStorage({
//     destination: (req, file, cb) => {
//       // Save the file in 'src/uploads' folder
//       cb(null, path.join(__dirname, 'src', 'uploads'));
//     },
//     filename: (req, file, cb) => {
//       // Rename the file to prevent conflicts (optional)
//       console.log(req.body);
      
//       const newFileName = Date.now() + path.extname(file.originalname);  // Add a timestamp to the filename
//       cb(null, newFileName);
//     }
//   });
const upload = multer({storage});

function uploadPDFRoute(app) {
    app.post("/upload", upload.single("pdf"), (req, res) => {
        const id = req.body.id; // Now, req.body.id is available

        if (!req.files || !req.files.pdf) {
            return res.status(400).json({ message: req.files });
        }

        res.json({ message: "Uploaded successfully", filename: req.files.pdf[0].filename });
    });
}
function uploadPDFTestRoute(app) {
    // Handle file upload
    app.post("/uploads", upload.single("pdf"), (req, res) => {
      const { id } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      
      const safeFileName = `${id}${req.file.originalname.normalize("NFC")}`
      console.log("Received file:", safeFileName);
  
      // Define the upload directory
      const uploadDir = path.join(__dirname, "uploads");
  
      // Ensure uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      // Define the file path where the file will be saved
      const filePath = path.join(uploadDir, safeFileName);
  
      // Save the file to the uploads directory
      fs.writeFileSync(filePath, req.file.buffer);
      console.log(`File saved at: ${filePath}`);
      
      const query = `UPDATE book SET read_link = '${safeFileName}' WHERE id = '${id}'`
      db.query(query, (err, result) => {
        err ? res.json({message: err}) : res.json({message2 : "read link updated"})
      })
      
    });
    
    
}

function GetMostViewRoute(app){
    app.get("/most-view", getbook_controller.GetMostViewController)
}
function GetMostDownloadRoute(app){
    app.get("/most-download", getbook_controller.GetMostViewController)
}
module.exports = { GetBookUserRequestedRoute, GetMostDownloadRoute, GetMostViewRoute, uploadPDFTestRoute, uploadPDFRoute, ReadPDFRoute, ProtectRouteAdminRoute, AdminLoginRoute, ChangeDownloadLinkRoute, AddDownloadRoute, AddViewRoute, AdminSearchRoute, GetBookAsTypeRoute, GetBookAsKeywordRoute, GetBookSearchRoute, getEndIdRoute, AddBookRoute, Getbook, Get_book_as_lang, deleteRoute, EditRoute }