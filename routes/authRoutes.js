const express=require('express');
const { createUser, LoginUser, getAllUsers, getUser, isProfileCompleted, updateProfile } = require('../controllers/authController');
const router=express.Router();

router.post('/register',createUser)
router.post("/login",LoginUser);
router.get("/allUsers",getAllUsers);
router.get('/user',getUser);
router.post('/isProfileCompleted',isProfileCompleted);
router.post('/update-profile',updateProfile);
module.exports=router;