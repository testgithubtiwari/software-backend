const mongoose = require('mongoose');
const DeviceToken = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    devicetoken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("devicetoken", DeviceToken);