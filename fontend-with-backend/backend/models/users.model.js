const { model, Schema} = require('mongoose');

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true
});

const userModel = model("User", userSchema);

module.exports = userModel;