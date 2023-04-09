const mongoose = require('mongoose');
const Schems = mongoose.Schema;

const UserSchema = new Schems({
    img: {type: String},
    title: {type: String},
    description: {type: String},
    date:{type: String}
});

module.exports = hackathons = mongoose.model('hackathons', UserSchema);
