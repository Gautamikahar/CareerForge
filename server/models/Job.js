const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
    },

    experience: {
      type: String,
    },

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
      ],
      default: "Full Time",
    },

    workMode: {
      type: String,
      enum: [
        "Onsite",
        "Remote",
        "Hybrid",
      ],
      default: "Onsite",
    },

    skills: [
      {
        type: String,
      },
    ],

    requirements: {
      type: String,
    },

    deadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);