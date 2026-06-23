const Job = require("../models/Job");
const Application = require("../models/Application");
const Profile = require("../models/Profile");
const Resume = require("../models/Resume");
// Create Job
exports.createJob = async (req, res) => {
  try {

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find()
      .populate(
        "postedBy",
        "name email"
      )
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Apply Job
exports.applyJob = async (req, res) => {
  try {

    const jobId = req.params.id;

    const existingApplication =
      await Application.findOne({
        job: jobId,
        applicant: req.user.id
      });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied"
      });
    }

    const application =
      await Application.create({
        job: jobId,
        applicant: req.user.id
      });

    res.status(201).json({
      success: true,
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Applicants for a Job
exports.getApplicants = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
        "applicant",
        "name email role"
      )
      .populate(
        "job",
        "title company"
      );

    const applicants = await Promise.all(

      applications.map(async (application) => {

        const profile = await Profile.findOne({
          user: application.applicant._id,
        });

        const resume = await Resume.findOne({
          user: application.applicant._id,
        });

        return {

          ...application.toObject(),

          profile,

          resume,

        };

      })

    );

    res.status(200).json({

      success: true,

      count: applicants.length,

      applicants,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};
// Recruiter Dashboard
exports.getRecruiterDashboard = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const totalJobs = jobs.length;

    const jobIds = jobs.map((job) => job._id);

    const totalApplications =
      await Application.countDocuments({
        job: { $in: jobIds },
      });

    res.status(200).json({
      success: true,
      totalJobs,
      totalApplications,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Application Status
exports.updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const application =
      await Application.findById(
        req.params.applicationId
      );

    if (!application) {

      return res.status(404).json({
        success: false,
        message: "Application not found"
      });

    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    Object.assign(job, req.body);

    if (req.body.skills) {
      job.skills =
        typeof req.body.skills === "string"
          ? req.body.skills
              .split(",")
              .map((s) => s.trim())
          : req.body.skills;
    }

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job Updated",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};