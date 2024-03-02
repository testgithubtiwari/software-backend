const express = require('express');
const bodyparser=require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan=require('morgan');
const cors = require("cors");
dotenv.config();

const mongoURI = process.env.MONGODB_URI;  
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => console.log(`Software project is listening on port ${process.env.PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
const authRouter=require('./routes/authRoutes');


app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.use("/api.software-project.in/api/user",authRouter);
