const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    planId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    maxUsers: { type: Number, default: 1 },
});

module.exports = mongoose.model('Plan', planSchema);
