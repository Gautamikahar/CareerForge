const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");

//console.log("✅ NEW CLOUDINARY RESUME CONTROLLER LOADED");

// ==========================
// Upload / Replace Resume
// ==========================
exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    let resume = await Resume.findOne({
      user: req.user.id,
    });

    // -------------------------
    // Replace Existing Resume
    // -------------------------
    if (resume) {

      // Delete old resume from Cloudinary
      if (resume.publicId) {
        await cloudinary.uploader.destroy(
          resume.publicId,
          {
            resource_type: "raw",
          }
        );
      }

      // Save new resume details
      resume.fileName = req.file.originalname;
      resume.fileUrl = req.file.path;
      resume.publicId = req.file.filename;

      await resume.save();

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        resume,
      });
    }

    // -------------------------
    // Upload New Resume
    // -------------------------
    resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      publicId: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get Resume
// ==========================
exports.getMyResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Delete Resume
// ==========================
// exports.deleteResume = async (req, res) => {

//   try {

//     const resume = await Resume.findOne({
//       user: req.user.id,
//     });

//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }

//     // Delete from Cloudinary
//     if (resume.publicId) {
//       await cloudinary.uploader.destroy(
//         resume.publicId,
//         {
//           resource_type: "raw",
//         }
//       );
//     }

//     // Delete from MongoDB
//     await Resume.findByIdAndDelete(resume._id);

//     res.status(200).json({
//       success: true,
//       message: "Resume deleted successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// };
exports.deleteResume = async (req, res) => {
  try {
    //console.log("Inside delete controller");

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    console.log("Resume Found:", resume);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    //console.log("Deleting from Cloudinary...");

    await cloudinary.uploader.destroy(
      resume.publicId,
      {
        resource_type: "raw",
      }
    );

    //console.log("Deleting from MongoDB...");

    await Resume.findByIdAndDelete(resume._id);

    //console.log("Deleted Successfully");

    res.json({
      success: true,
      message: "Resume deleted",
    });

  } catch (err) {
    console.log("DELETE ERROR:");
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};