const { Schema, model } = require('mongoose');
const urlTypes = require('mongoose-type-url');

const userSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    gender: { type: String, enum: ["Male", "Female", "Genderqueer", "Genderfluid", "Agender", "Bigender", "Polygender", "Non-binary"] },
    date: Date,
    time: String,
    domain: urlTypes,
    cost: { type: Number, min: 0 }
});

module.exports = model('User', userSchema);