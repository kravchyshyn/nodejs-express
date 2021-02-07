const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        requere: true
    },
    image: String
});

module.exports = model('Course', schema);
