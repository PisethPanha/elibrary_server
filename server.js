const express = require('express');
const Getbook = require('./src/routes/GetBook');
const multer = require("multer")
const fs = require("fs");
const db = require("./src/database/database.js").connection;
const app = express();
const port = 3000;
const path = require("path")

const cors = require('cors');

app.use(cors());
app.use(express.json());

setInterval(() => {
  db.query("SELECT 1",(err, result) => {
    err ? console.log(err) : console.log(result);
  })
}, 50000)

Getbook.GetBookUserRequestedRoute(app);
Getbook.testGetIDRoute(app);
Getbook.handleApprovalRoute(app);
Getbook.uploadPDFRoute(app);
Getbook.uploadPDFTestRoute(app)
Getbook.GetMostViewRoute(app);
Getbook.ReadPDFRoute(app)
Getbook.Getbook(app);
Getbook.Get_book_as_lang(app);
Getbook.deleteRoute(app);
Getbook.EditRoute(app);
Getbook.AddBookRoute(app);
Getbook.getEndIdRoute(app);
Getbook.GetBookSearchRoute(app);
Getbook.GetBookAsKeywordRoute(app);
Getbook.GetBookAsTypeRoute(app);
Getbook.AdminSearchRoute(app);
Getbook.AddViewRoute(app);
Getbook.AddDownloadRoute(app);
Getbook.ChangeDownloadLinkRoute(app);
Getbook.AdminLoginRoute(app);
Getbook.GetMostDownloadRoute(app)
Getbook.ProtectRouteAdminRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
