const mongoose = require('mongoose');

const DesignCreditSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    eligibleBranches: {
        type: Array,
        default: ['All']
    },
    professorName: {
        type: String,
        required: true,
    },
    offeredBy: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("DesignCredits", DesignCreditSchema);
