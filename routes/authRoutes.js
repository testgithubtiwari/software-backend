const express=require('express');
const { createUser, LoginUser, getAllUsers, getUser } = require('../controllers/authController');
const router=express.Router();

router.post('/register',createUser)
router.post("/login",LoginUser);
router.get("/allUsers",getAllUsers);
router.get('/user',getUser);
module.exports=router;