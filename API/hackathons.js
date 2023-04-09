const hackathonController = require('../src/controllers/hackathons');
const express = require('express');

const router = express.Router();

router.get("/all", hackathonController.findAllHackathons);

router.get("/:id", hackathonController.findById);

router.post("/add", hackathonController.addHackathon);

module.exports = router;