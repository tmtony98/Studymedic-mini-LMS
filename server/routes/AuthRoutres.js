const express = require("express");
const router = new express.Router();

const exampleController = require("../controllers/Controller");

router.get("/login", exampleController.getExamples);
router.post("/register", exampleController.createExample);

module.exports = router;
