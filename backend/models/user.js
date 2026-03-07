const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


// virtual relation
userSchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "userId"
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('User', userSchema);