const mongoose = require('mongoose')

const genericPupilSchema = new mongoose.Schema({
    data: Schema.Types.Mixed,
});


module.exports = mongoose.model('GenericPupilModel', genericPupilSchema);