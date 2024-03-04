const DesignCredit = require("../models/designCreditModel");
const asyncHandler = require('express-async-handler');
const mongoose=require('mongoose');

const addDesignCredit = asyncHandler(async (req, res) => {
    try {

        // console.log(req.headers);
        // Check if the user is a Professor
        if (req.headers.usertype !== "Professor") {
            return res.status(403).json({ message: "Only Professors are allowed to add design credits." });
        }

        // Check if all required fields are present in the request body
        const { projectName, eligibleBranches, professorName, offeredBy, description } = req.body;
        if (!projectName || !eligibleBranches || !professorName || !offeredBy || !description) {
            return res.status(400).json({ message: "Please provide all required fields: projectName, eligibleBranches, professorName, offeredBy, description." });
        }

        // Create a new instance of the DesignCredit model with the request body data
        const newDesignCredit = new DesignCredit({
            projectName,
            eligibleBranches,
            professorName,
            offeredBy,
            description
        });

        // Save the new design credit to the database
        const savedDesignCredit = await newDesignCredit.save();

        // Respond with status 201 (Created) and send the saved design credit in the response
        res.status(201).json(savedDesignCredit);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const getAllDesignCredits = asyncHandler(async (req, res) => {
    try {
        // Retrieve all design credits from the database
        const designCredits = await DesignCredit.find();

        // Respond with status 200 (OK) and send the design credits in the response
        res.status(200).json(designCredits);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const removeDesignCredit = asyncHandler(async (req, res) => {
    try {
        // Extract the design credit ID from the request parameters
        const id = req.query.Id;

        if (!id) {
            return res.status(400).json({ message: "No id provided in the query" });
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Invalid id provided in the query" });
        }

        // Check if the design credit exists
        const designCredit = await DesignCredit.findById(id);
        if (!designCredit) {
            return res.status(404).json({ message: "Design credit not found" });
        }

        // Remove the design credit from the database
        await DesignCredit.findByIdAndDelete(id);

        // Respond with status 200 (OK) and a success message
        res.status(200).json({ message: "Design credit removed successfully" });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const filterDesignCredit = asyncHandler(async (req, res) => {
    try {
        // Extract parameters from request query
        const { byProfessorName, byBranchEligible } = req.query;

        // Build query object based on provided parameters
        const query = {};

        if (byProfessorName) {
            // Case-insensitive search using regular expression
            query.professorName = { $regex: new RegExp(byProfessorName, 'i') };
        }

        if (byBranchEligible) {
            // Case-insensitive search using regular expression
            query.eligibleBranches = { $regex: new RegExp(byBranchEligible, 'i') };
        }

        // Find design credits matching the query
        const designCredits = await DesignCredit.find(query);

        // Respond with status 200 (OK) and send the filtered design credits in the response
        res.status(200).json(designCredits);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { addDesignCredit,getAllDesignCredits,removeDesignCredit,filterDesignCredit };
