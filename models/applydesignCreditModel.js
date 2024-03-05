const mongoose = require('mongoose');

const applyDesignCreditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    resumeLink: {
        type: String,
        required: true,
    },
    designCreditId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DesignCredits',  
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("AppliedDesignCredits", applyDesignCreditSchema);