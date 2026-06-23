// exports.getProfile = async (req, res) => {

//   res.json({
//     success: true,
//     message: "Protected Route Accessed",
//     user: req.user
//   });

// };
const Application = require("../models/Application");
const Profile = require("../models/Profile");
const Resume = require("../models/Resume");

exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentDashboard = async (req, res) => {
  try {

    const profile = await Profile.findOne({
      user: req.user.id
    });

    const resume = await Resume.findOne({
      user: req.user.id
    });

    const applications = await Application.find({
      applicant: req.user.id
    }).populate(
      "job",
      "title company location"
    );

    res.status(200).json({
      success: true,
      profile,
      resume,
      applications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};