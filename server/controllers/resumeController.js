const Resume = require("../models/Resume");
const fs = require("fs");

// ==========================
// Upload / Replace Resume
// ==========================
exports.uploadResume = async (req, res) => {
  try {

    let resume = await Resume.findOne({
      user: req.user.id
    });

    // If resume already exists, delete old PDF
    if (resume) {

      if (
        resume.filePath &&
        fs.existsSync(resume.filePath)
      ) {
        fs.unlinkSync(resume.filePath);
      }

      resume.fileName = req.file.filename;
      resume.filePath = req.file.path;

      await resume.save();

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        resume
      });

    }

    // Upload first resume

    resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.filename,
      filePath: req.file.path
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ==========================
// Get Resume
// ==========================
exports.getMyResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    res.status(200).json({
      success: true,
      resume
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ==========================
// Delete Resume
// ==========================
exports.deleteResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user.id
    });

    if (!resume) {

      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });

    }

    if (
      resume.filePath &&
      fs.existsSync(resume.filePath)
    ) {
      fs.unlinkSync(resume.filePath);
    }

    await Resume.findByIdAndDelete(
      resume._id
    );

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};