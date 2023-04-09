const mongoose = require('mongoose');
const hackathons = require('../db/hackathons');

const findAllHackathons = (req, res) => {
    hackathons.find((err, hackathon) => {
        err && res.send(500).send(err.message);

        res.status(200).json(hackathon);
    })
}

const findById = (req, res) => {
    hackathons.findById(req.params.id, (err, hackathon) => {
        err && res.status(500).send(err.message);
        res.status(200).json(hackathon);
    })
}

const addHackathon = (req, res) => {
    let hackathon = new hackathons({
        img: req.body.img,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })
    hackathon.save((err, hck) => {
        err && res.status(500).send(err.message);

        res.status(200).json(hck);
    })
}

module.exports = {findAllHackathons, findById, addHackathon};

