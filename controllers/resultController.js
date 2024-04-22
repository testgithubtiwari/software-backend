const Result = require("../models/resultModel");
const asyncHandler = require("express-async-handler");

const postResult = asyncHandler(async (req, res) => {
  try {
    const { designCreditId, status, userId } = req.body;
    if (!designCreditId || !userId) {
      return res.status(400).send({ error: "Please provide all the fields" });
    }

    const checkExistingResult = await Result.findOne({
      userId,
      designCreditId,
    });

    if (checkExistingResult) {
      checkExistingResult.status = status;
      await checkExistingResult.save();
      return res.status(200).send({
        message: "Entry updated successfully",
        result: checkExistingResult,
      });
    } else {
      const newResult = new Result({ userId, designCreditId, status });
      await newResult.save();
      return res.status(201).send({
        message: "New Result created successfully",
        result: newResult,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = { postResult };
