const express = require("express");
const {
  handleGenerateShortURL,
  handleGetURLWithShortURL,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get("/:id", handleGetURLWithShortURL);

module.exports = router;
