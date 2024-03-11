// const multer = require('multer');
 
// const express = require('express');
// const path = require('path');
// const app = express();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null,"./public/temp");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage: storage });
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'temp')));
// module.exports = upload;