const ApplyDesignCredits = require('../models/applydesignCreditModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const validUrl = require('valid-url');

const addApplicationDesignCredit = asyncHandler(async (req, res) => {
    try {
        // Extract data from request body
        const { userId, resumeLink, designCreditId } = req.body;

        // Validate data
        if (!userId || !designCreditId) {
            return res.status(400).json({ message: "Please provide userId and designCreditId." });
        }

        // Validate resumeLink format
        if (resumeLink && !validUrl.isWebUri(resumeLink)) {
            return res.status(400).json({ message: "Invalid resumeLink format. Please provide a valid URL." });
        }

        // Create a new instance of the ApplyDesignCredits model
        const newApplicationDesignCredit = new ApplyDesignCredits({
            userId,
            resumeLink,
            designCreditId
        });

        // Save the new instance to the database
        const savedApplicationDesignCredit = await newApplicationDesignCredit.save();

        // Respond with status 201 (Created) and send the saved application design credit in the response
        res.status(201).json(savedApplicationDesignCredit);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getAllApplication = asyncHandler(async (req, res) => {
    try {
        // Fetch all application design credits from the database
        const allApplications = await ApplyDesignCredits.find();

        // Respond with status 200 (OK) and send all application design credits in the response
        res.status(200).json(allApplications);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const getSpecificApplication = asyncHandler(async (req, res) => {
    try {
        const id = req.query.id;

        // Check if id is missing
        if (!id) {
            return res.status(400).json({ message: "Please provide an id." });
        }

        // Fetch the specific application design credit from the database
        const specificApplication = await ApplyDesignCredits.findById(id);

        // Check if application design credit with the provided id exists
        if (!specificApplication) {
            return res.status(404).json({ message: "Application design credit not found." });
        }

        // Respond with status 200 (OK) and send the specific application design credit in the response
        res.status(200).json(specificApplication);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getAllApplicationofUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.query.id;

        // Check if userId is missing
        if (!userId) {
            return res.status(400).json({ message: "Please provide a user id." });
        }

        // Fetch all application design credits associated with the specified user id
        const userApplications = await ApplyDesignCredits.find({ userId });

        // Respond with status 200 (OK) and send the user's application design credits in the response
        res.status(200).json(userApplications);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { addApplicationDesignCredit,getAllApplication,getSpecificApplication,getAllApplicationofUser };
