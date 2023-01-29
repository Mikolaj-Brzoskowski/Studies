const { Schema, model } = require('mongoose');
const Post = require('../Post');

// Pole „_id” dodawane jest domyślnie, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    login: String,
    email: String,
    registrationDate: Date,
    posts: [{ref: Post}]
});

module.exports = model('User', userSchema);
