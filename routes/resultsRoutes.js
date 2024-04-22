const express = require("express");
const {
  postResult,
  getSpecificResult,
  getAllResult,
} = require("../controllers/resultController");

const router = express.Router();

router.post("/post-result", postResult);
router.get("/get-result", getSpecificResult);
router.get("/get-all-result", getAllResult);
module.exports = router;
