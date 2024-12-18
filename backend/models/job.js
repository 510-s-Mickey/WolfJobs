const mongoose = require("mongoose");

/**
 * Represents a schema for storing job data including the name,
 * managerID, manager affiliation, status, location, description,
 * pay, required skills, type, and questions
 */
const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  managerid: {
    type: String,
    required: true,
  },
  managerAffiliation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  question1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  question3: {
    type: String,
    required: true,
  },
  question4: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
