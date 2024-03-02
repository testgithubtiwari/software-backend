const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require("cors");

dotenv.config();

const uri = `mongodb+srv://admin:${process.env.MONGODB_PASS}@software1.gptczdh.mongodb.net/softwaredb?retryWrites=true&w=majority&appName=software1`;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

const authRouter = require('./routes/authRoutes');

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/software-project.in/user", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Software project is listening on port ${process.env.PORT || 3000}`);
});

app.get('/',(req,res)=>{
  res.send( "Welcome to software Project API");
})
