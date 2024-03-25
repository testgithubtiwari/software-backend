const express=require('express');
const { addToken, getSpecificToken, sendPushNotification } = require('../controllers/pushnotification');
const router=express.Router();


router.post('/add-token',addToken);
router.get('/get-token',getSpecificToken);
router.post('/send-notification',sendPushNotification);

module.exports=router;