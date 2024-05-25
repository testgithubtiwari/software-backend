const express=require('express');
const { sendemail } = require('../controllers/sendemailcontroller');
 
const router=express.Router();

router.post('/send-email',sendemail);
module.exports=router;