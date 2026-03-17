const express = require("express");
const router = new express.Router();

const exampleController = require("../controllers/exampleController");

router.get("/", exampleController.getExamples);
router.post("/", exampleController.createExample);

module.exports = router;
