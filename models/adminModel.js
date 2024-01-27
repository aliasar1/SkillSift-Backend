const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Please add username"],
        },
        email: {
            type: String,
            required: [true, "Please add email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);