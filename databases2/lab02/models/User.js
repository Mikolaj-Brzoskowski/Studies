const { Schema, model, SchemaTypes } = require('mongoose');
require('mongoose-type-email')

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    login: {
        type: String,
        required: true
      },
    email: {
        type: SchemaTypes.Email,
        required: true,
        unique: true
      },
    registrationDate: Date,
});

module.exports = model('User', userSchema);