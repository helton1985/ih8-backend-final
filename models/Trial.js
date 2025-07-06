const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000) }, // 7 dias de trial
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Trial', trialSchema);
