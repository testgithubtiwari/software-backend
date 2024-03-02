const User=require('../models/userModel');
const asyncHandler=require('express-async-handler');
const generateToken=require('../config/jwtToken');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secretKey = process.env.SECRET_KEY;
const createUser = asyncHandler(
    async (req, res) => {
        try {
            const { email, userType, rollNumber, branch, password } = req.body;

            if (!email || !userType || !password) {
                return res.status(400).json({ error: 'Please provide all the required fields' });
            }

            // Check if the user already exists in your database
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            // Check if userType is "student" and if rollNumber and branch are provided
            if (userType === "Student" && (!rollNumber || !branch)) {
                return res.status(400).json({ error: 'Please provide rollNumber and branch for student users' });
            }

            // If the user doesn't exist and userType is "student", check for rollNumber and branch
            const newUser = await User.create({
                email,
                userType,
                branch: userType === "Student" ? branch : undefined,
                rollNumber: userType === "Student" ? rollNumber : undefined,
                password
            });

            // You can customize the response based on your needs
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

const LoginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email ||  !password) {
            return res.status(400).json({ error: 'Please provide all the required fields' });
        }

        // Check if the user with the provided email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Email Id is not registered' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatched = await user.comparePassword(password);

        if (isPasswordMatched) {

            const { accessToken, refreshToken } = generateToken(user._id);
            // Password is correct, you can generate a token or handle the login process
            res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
     
        } else {
            // Password is incorrect
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const getAllUsers = asyncHandler(async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // You can customize the response based on your needs
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const getUser = asyncHandler(async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        if (!accessToken) {
            return res.status(401).json({ error: 'Access token is missing' });
        }

        const decodedAccessToken = verifyAccessToken(accessToken);
        if (!decodedAccessToken) {
            const refreshToken = req.query.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: 'Access token is not valid! Please send refresh token' });
            }
            const decodedRefreshToken = verifyRefreshTokenFromBearer(refreshToken);
            console.log(decodedRefreshToken);

            if (!decodedRefreshToken) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }

            if (isTokenExpired(decodedAccessToken) && isTokenExpired(decodedRefreshToken)) {
                return res.status(401).json({ error: 'Both access and refresh tokens are expired. Please log in again.' });
            }

            const newAccessToken = generateAccessToken(decodedRefreshToken.user.id);
            // console.log(newAccessToken);

            res.setHeader('Authorization', newAccessToken);
            const userId1 = decodedRefreshToken?.user?.id; // Use optional chaining to handle null values
            if (!userId1) {
                return res.status(401).json({ error: 'User ID not found in refresh token' });
            }

            const user = await User.findById(userId1);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        }

        if(decodedAccessToken){
            const userId = decodedAccessToken.user.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            res.status(200).json({ user });
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



function verifyAccessToken(accessToken) {
    try {
        // Use your secret key or public key to verify the token
        const decoded = jwt.verify(accessToken, secretKey);

        return decoded;
    } catch (error) {
        // Token verification failed
        // console.error('Error verifying access token:', error);
        return null;
    }
}

// Function to verify the refresh token
function verifyRefreshTokenFromBearer(authorizationHeader) {
    try {
        // Extract the token from the "Bearer Token" format
         
        const refreshToken = authorizationHeader

        // Use your secret key or public key to verify the token
        const decoded = jwt.verify(refreshToken, secretKey);

        return decoded;
    } catch (error) {
        // Token verification failed
        // console.error('Error verifying refresh token:', error);
        return null;
    }
}

// Function to check if a token is expired
function isTokenExpired(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
        return true; // Token is considered expired if no expiration time is found
    }

    // Check if the expiration time has passed (in seconds)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
}

// Function to generate a new access token using the refresh token
function generateAccessToken(userId) {
    const payload = {
        user: { id: userId },
        tokenType: 'access'
    };
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '5m' });
    return accessToken;
}



module.exports = { createUser,LoginUser,getAllUsers,getUser};


 