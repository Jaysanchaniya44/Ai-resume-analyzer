const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  resumeText: {
    type: String,
  },

  analysis: {
    type: String,
  },

  atsScore: {
    type: Number,
  },

}, {
  timestamps: true,
});

module.exports =
  mongoose.model(
    "Resume",
    resumeSchema
  );