const SavedJob = require("../models/SavedJob");

//
// Save Job
//
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const alreadySaved = await SavedJob.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const saved = await SavedJob.create({
      user: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Remove Saved Job
//
exports.removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const saved = await SavedJob.findOneAndDelete({
      user: req.user.id,
      job: jobId,
    });

    if (!saved) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Get All Saved Jobs
//
exports.getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      user: req.user.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "postedBy",
          select: "name email",
        },
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Check if Job is Saved
//
exports.isJobSaved = async (req, res) => {
  try {
    const saved = await SavedJob.findOne({
      user: req.user.id,
      job: req.params.jobId,
    });

    res.status(200).json({
      success: true,
      saved: !!saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};