const { Schema, model } = require('mongoose');
const User = require('../User');

// Pole „_id” dodawane jest domyślnie, dlatego pomijamy je w deklaracji
const postSchema = new Schema({
    text: String,
    responses: Number,
    author: [{ref: User}]
});

module.exports = model('Post', postSchema);
