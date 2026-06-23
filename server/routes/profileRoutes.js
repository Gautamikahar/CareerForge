const express = require("express");

const router = express.Router();

const {
  createProfile,
  getMyProfile,
  updateProfile,
  uploadProfilePhoto,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/profileUpload");

// Create Profile
router.post(
  "/create",
  protect,
  createProfile
);

// Get Profile
router.get(
  "/me",
  protect,
  getMyProfile
);

// Update Profile
router.put(
  "/update",
  protect,
  updateProfile
);

// Upload Profile Photo
router.post(
  "/upload-photo",
  protect,
  upload.single("photo"),
  uploadProfilePhoto
);

module.exports = router;