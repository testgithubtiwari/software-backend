const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// console.log(storage);

const upload = multer({ storage: storage });
console.log(upload); 

module.exports = upload;