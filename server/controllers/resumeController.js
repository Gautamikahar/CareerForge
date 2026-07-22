const Resume = require("../models/Resume");
const path = require("path");
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

      const oldFile = path.join(
  __dirname,
  "..",
  resume.filePath
);

if (fs.existsSync(oldFile)) {
  fs.unlinkSync(oldFile);
}

      resume.fileName = req.file.filename;
      resume.filePath =  `/uploads/resumes/${req.file.filename}`

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
      filePath:  `/uploads/resumes/${req.file.filename}`
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

    const fileLocation = path.join(
  __dirname,
  "..",
  resume.filePath.replace(/^\//, "")
);


if (fs.existsSync(fileLocation)) {
  fs.unlinkSync(fileLocation);
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