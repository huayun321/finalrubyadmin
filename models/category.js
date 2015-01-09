var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    description: String,
    date: { type: Date, default: Date.now }
});

var Category = mongoose.model('categorys', schema);
module.exports = Category;

