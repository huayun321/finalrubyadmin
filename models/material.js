var mongoose = require('mongoose');

var schema = mongoose.Schema({
    imgId: mongoose.Schema.Types.ObjectId,
    thumbnailId: mongoose.Schema.Types.ObjectId,
    createdOn: { type: Date, default: Date.now },
    tags:[String],
    size: Number
});

var Material = mongoose.model('material', schema);
module.exports = Material;

