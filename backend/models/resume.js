const mongoose = require("mongoose");

/**
 * Represents a schema for storing resume data including the 
 * applicant ID, file name, file data, content type, and 
 * when it was uploaded
 */
const resumeSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  fileName: {
    type: String,
    required: true,
  },
  fileData: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    default: "application/pdf",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
