const express = require("express");

const router = express.Router();

const {
  uploadResume,
  getMyResume,
  deleteResume
} = require("../controllers/resumeController");

const { protect } = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);
router.get("/test", (req, res) => {
  res.send("Resume route is working");
});
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/my",
  protect,
  getMyResume
);

router.delete(
  "/delete",
  (req, res, next) => {
    //console.log("DELETE ROUTE HIT");
    next();
  },
  protect,
  deleteResume
);
module.exports = router;