const admin=require('firebase-admin');
const serviceAccount=require('../services.json');
const asyncHandler=require('express-async-handler');
const addDeviceToken=require('../models/pushNotificationModel');

const addToken=asyncHandler(async (req,res)=>{
    try{
        const {userId,devicetoken}=req.body;
        if(!userId || !devicetoken)
        {
            return res.status(400).json({ error: 'Please provide userId and Device token!' });
        }
        
        const existingToken = await addDeviceToken.findOne({ userId });

        if (existingToken) {
            return res.status(409).json({ error: 'Token already in the database' });
        }

        const newToken = await addDeviceToken.create({
            userId,
            devicetoken,
        });
        res.status(201).json({ message: 'Device Token added successfully', token:newToken  });

    }catch(error){
        console.error('Error adding token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getSpecificToken = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'Please provide userId in the body' });
        }

        const existingToken = await addDeviceToken.findOne({ userId });

        if (!existingToken) {
            return res.status(404).json({ error: 'There is no token for the requested device' });
        }


        res.status(200).json({ message: 'Token found', token: existingToken.devicetoken });

    } catch (error) {
        console.error('Error retrieving token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = asyncHandler(async (req, res) => {
    try {
        const { deviceToken, title, body } = req.body;

        if (!deviceToken || !title || !body) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        await firebaseAdmin.messaging().send({
            token: deviceToken,
            notification: {
                title,
                body,
            }
        });

        res.status(200).json({ success: true, message: "Push notification sent successfully" });
    } catch (error) {
        console.error("Error sending push notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports={sendPushNotification,addToken,getSpecificToken};