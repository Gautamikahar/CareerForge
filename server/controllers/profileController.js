const Profile = require("../models/Profile");

// Create Profile
exports.createProfile = async (req, res) => {

  try {

    const existingProfile =
      await Profile.findOne({
        user: req.user.id
      });

    if (existingProfile) {

      return res.status(400).json({
        success: false,
        message:
          "Profile already exists"
      });

    }

    const {
      college,
      branch,
      year,
      skills,
      github,
      linkedin,
      bio
    } = req.body;

    const profile =
      await Profile.create({

        user: req.user.id,

        college,

        branch,

        year,

        skills:
          typeof skills === "string"
            ? skills
                .split(",")
                .map(skill => skill.trim())
            : skills,

        github,

        linkedin,

        bio

      });

    res.status(201).json({

      success: true,

      profile

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// Get Logged In User Profile
exports.getMyProfile = async (req, res) => {
  try {

    const profile = await Profile.findOne({
      user: req.user.id
    }).populate(
      "user",
      "name email role"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Update Profile
exports.updateProfile = async (req, res) => {

  try {

    const {
      college,
      branch,
      year,
      skills,
      github,
      linkedin,
      bio
    } = req.body;

    const profile =
      await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          college,
          branch,
          year,
          skills:
            typeof skills === "string"
              ? skills
                  .split(",")
                  .map(skill => skill.trim())
              : skills,
          github,
          linkedin,
          bio
        },
        {
          new: true
        }
      ).populate(
        "user",
        "name email role"
      );

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
exports.uploadProfilePhoto = async (req,res)=>{

    try{

        const profile=await Profile.findOne({

            user:req.user.id

        });

        if(!profile){

            return res.status(404).json({

                success:false,
                message:"Profile not found"

            });

        }

        profile.profileImage=req.file.path;

        await profile.save();

        res.json({

            success:true,
            profile

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};
