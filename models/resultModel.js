const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    designCreditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesignCredits",
      required: true,
    },
    status: {
      type: String,
      default: "waiting",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Results", ResultSchema);
