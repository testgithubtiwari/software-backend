const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require("cors");
const multer = require('multer');
const path = require('path');

dotenv.config();

const uri = `mongodb+srv://admin:${process.env.MONGODB_PASS}@software1.gptczdh.mongodb.net/softwaredb?retryWrites=true&w=majority&appName=software1`;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

const authRouter = require('./routes/authRoutes');
const designCreditRouter=require('./routes/designCreditRoutes');
const applyDesignCredit=require('./routes/applyDesignCreditRoutes');


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/software-project.in/user", authRouter);
app.use("/software-project.in/design", designCreditRouter);
app.use("/software-project.in/application",applyDesignCredit);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with current timestamp
  },
});
const upload = multer({ storage });

// Define a route for file uploads
app.post('/software-project.in/application/get-link', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Construct public URL for the uploaded file
  const publicUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
  console.log(publicUrl);

  // Send the public URL as a response
  res.json({ publicUrl });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Software project is listening on port ${process.env.PORT || 3000}`);
});

app.get('/',(req,res)=>{
  res.json({message:"welcome to software api again"});
});
