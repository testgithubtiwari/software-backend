const express = require("express");
const { postResult } = require("../controllers/resultController");

const router = express.Router();

router.post("/post-result", postResult);

module.exports = router;
