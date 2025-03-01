const mongoose = require('mongoose');

const genericPupilSchema = new mongoose.Schema({},
    { strict: false });

module.exports = mongoose.model('GenericPupilModel', genericPupilSchema);