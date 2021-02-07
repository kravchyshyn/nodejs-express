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
    image: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Course', schema);
